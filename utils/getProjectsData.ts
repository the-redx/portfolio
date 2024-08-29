import { GithubProfileResponse, GithubRepoResponse } from '@/types/github.type';
import { ProjectsData } from '@/types/profile.type';

export const MAX_PROJECTS_COUNT = 6;

export async function getProjectsData(
  username: string,
  reposToExclude: string[] = [],
): Promise<ProjectsData | null> {
  try {
    const profileReq = fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600, tags: ['github-api', 'portfolio'] },
    });

    const excludeRepos = reposToExclude.map(project => `+-repo:${project}`).join('');
    const query = `user:${username}+fork:false${excludeRepos}`;
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
