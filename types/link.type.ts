export type Link = {
  id: string;
  name: string;
  shortUrl: string;
  redirects: number;
  url: string;
  status: 'active' | 'paused';
  dateCreated: string;
  dateUpdated: string;
};
