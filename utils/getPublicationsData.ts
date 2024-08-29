import { PublicationsData } from '@/types/profile.type';
import { TeletypeResponse } from '@/types/teletype.type';
import Parser from 'rss-parser';
import { promisify } from 'util';
import { parseString } from 'xml2js';

const MAX_PUBLICATIONS_COUNT = 3;

export async function getPublicationsData(profile: string): Promise<PublicationsData | null> {
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
