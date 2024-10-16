import Parser from 'rss-parser';
import { promisify } from 'util';
import { parseString } from 'xml2js';
import { TeletypeResponse } from '@/types/teletype.type';
import { GithubProfileResponse, GithubRepoResponse } from '@/types/github.type';
import { ProjectsData, PublicationsData } from '@/types/profile.type';
import { MAX_PROJECTS_COUNT, MAX_PUBLICATIONS_COUNT, certifications, educations, exprerience, languages, skills } from '@/constants/portfolio';

export async function getProfile() {
  return {
    exprerience,
    certifications,
    educations,
    skills,
    languages,
  };
}

export async function getPublications(profile: string): Promise<PublicationsData | null> {
  try {
    const parser = new Parser();
    const res = await fetch(`https://teletype.in/rss/${profile}`, {
      next: { revalidate: 3600, tags: ['teletype-api', 'portfolio'] },
    });

    const plainXml = await res.text();

    const xml = await promisify(parseString)(plainXml);
    const mediaContents = ((xml as any).rss.channel[0].item ?? []).map(
      (item: any) => item['media:content']?.[0]?.$,
    );

    const parsedContent = (await parser.parseString(plainXml)) as TeletypeResponse;

    return {
      allUrl: parsedContent.link,
      items: parsedContent.items.slice(0, MAX_PUBLICATIONS_COUNT).map((item, i) => ({
        image: mediaContents[i]?.url,
        title: item.title,
        publicationDate: item.isoDate,
        description: item.contentSnippet,
        tags: item.categories,
        href: item.link,
      })),
    };
  } catch (err) {
    return null;
  }
}

export async function getProjects(
  username: string,
  reposToExclude: string[] = [],
): Promise<ProjectsData | null> {
  try {
    const profileReq = fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600, tags: ['github-api', 'portfolio'] },
    });

    const excludeRepos = reposToExclude.map(project => `+-repo:${project}`).join('');
    const query = `user:${username}${excludeRepos}`;
    const url = `https://api.github.com/search/repositories?q=${query}&sort=updated&per_page=${MAX_PROJECTS_COUNT}&type=Repositories`;

    const reposReq = fetch(url, {
      headers: { 'Content-Type': 'application/vnd.github.v3+json' },
      next: { revalidate: 3600, tags: ['github-api', 'portfolio'] },
    });

    const [profileRes, reposRes] = await Promise.all([profileReq, reposReq]);
    const profile = (await profileRes.json()) as GithubProfileResponse;
    const repos = (await reposRes.json()) as GithubRepoResponse;

    return {
      allUrl: profile.html_url,
      items: repos.items.map(repo => ({
        id: repo.id,
        name: repo.name,
        forks: repo.forks,
        href: repo.html_url,
        stars: repo.stargazers_count,
        description: repo.description ?? '',
        language: repo.language ?? '',
      })),
    };
  } catch (err) {
    return null;
  }
}
