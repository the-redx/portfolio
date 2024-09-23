// Will be removed after implementing API
import { Link } from '@/types/link.type';

const links: Record<string, Link[]> = {};

const linksApiPath = process.env.LINKS_API_PATH ?? 'http://localhost:3000/api/links';

export async function getLinksData(
  userId: string,
  { offset, limit }: { offset: number; limit: number },
) {
  const linksBySession = links[userId] ?? [];

  return {
    hasMore: linksBySession.length > offset + limit,
    links: linksBySession
      .slice()
      .reverse()
      .slice(offset, offset + limit),
  };
}

export async function getByShortUrl(shortUrl: string) {
  const parsedShortUrl = parseShortUrl(shortUrl);

  for (const userId in links) {
    const index = links[userId].findIndex(link => link.id === parsedShortUrl);

    if (index !== -1) {
      const link = links[userId][index];
      link.clicks += 1;

      return link;
    }
  };

  throw new Error('Link not found');
}

export async function deleteByShortUrl(userId: string, shortUrl: string) {
  const parsedShortUrl = parseShortUrl(shortUrl);
  const link = (links[userId] ?? []).findIndex(link => link.id === parsedShortUrl);

  if (link === -1) {
    throw new Error('Link not found');
  }

  return links[userId].splice(link, 1);
}

export async function createLink(userId: string, body: { url: string; shortUrl?: string }) {
  const parsedShortUrl = body.shortUrl
    ? parseShortUrl(body.shortUrl)
    : Math.random().toString(36).substring(7);

  const isShortUrlExists = Object.values(links)
    .flat()
    .some(link => link.id === parsedShortUrl);

  if (isShortUrlExists) {
    throw new Error('Link with this short URL already exists');
  }

  const newLink: Link = {
    id: parsedShortUrl,
    url: body.url,
    shortUrl: `${linksApiPath}/${parsedShortUrl}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    clicks: 0,
  };

  if (!links[userId]) links[userId] = [];

  links[userId].push(newLink);

  return newLink;
}

function parseShortUrl(shortUrl: string) {
  return shortUrl.replace(linksApiPath + '/', '');
}
