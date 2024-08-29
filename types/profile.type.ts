export type Experience = {
  dateStart: string;
  dateEnd?: string;
  position: string;
  company: string;
  companyUrl?: string;
};

export type Certification = {
  dateIssued: string;
  title: string;
  issuer: string;
  certificateUrl: string;
};

export type Education = {
  dateStart: string;
  dateEnd: string;
  title: string;
  issuer: string;
  issuerUrl: string;
};

export type Language = {
  name: string;
  progress: number;
};

export type Publication = {
  image?: string;
  title: string;
  publicationDate: Date | string;
  description: string;
  tags: string[];
  href?: string;
};

export type PublicationsData = {
  allUrl: string;
  items: Publication[];
};

export type Project = {
  id: number;
  name: string;
  description: string;
  language: string;
  forks: number;
  stars: number;
  href: string;
};

export type ProjectsData = {
  allUrl: string;
  items: Project[];
};
