type TeletypeItem = {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  'content:encoded': string;
  'content:encodedSnippet': string;
  'dc:creator': string;
  comments: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  isoDate: string;
  mediaContent?: {
    medium: string;
    url: string;
  };
};

export type TeletypeResponse = {
  feedUrl: string;
  image: {
    link: string;
    url: string;
    title: string;
  };
  paginationLinks: { self: string };
  title: string;
  description: string;
  pubDate: string;
  generator: string;
  link: string;
  lastBuildDate: string;
  items: TeletypeItem[];
};
