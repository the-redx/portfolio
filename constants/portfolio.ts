import { Certification, Education, Experience, Language } from "@/types/profile.type";

export const MAX_PROJECTS_COUNT = 8;

export const MAX_PUBLICATIONS_COUNT = 3;

export const exprerience: Experience[] = [
  {
    dateStart: 'May 2023',
    position: 'Senior Software Engineer',
    company: 'SoftServe',
    companyUrl: 'https://softserveinc.com/',
  },
  {
    dateStart: 'November 2021',
    dateEnd: 'May 2023',
    position: 'Software Engineer',
    company: 'SoftServe',
    companyUrl: 'https://softserveinc.com/',
  },
  {
    dateStart: 'March 2020',
    dateEnd: 'October 2021',
    position: 'Software Engineer',
    company: 'NIX',
    companyUrl: 'https://www.nixsolutions.com/',
  },
  {
    dateStart: 'October 2019',
    dateEnd: 'March 2020',
    position: 'Freelancer',
    company: '',
  },
];

export const certifications: Certification[] = [
  {
    dateIssued: 'October 2023',
    title: 'Building Modern Web Applications with Go',
    issuer: 'Udemy',
    certificateUrl: 'https://www.udemy.com/certificate/UC-bfe96440-e756-4cca-b13b-c2a0561a4d6a/',
  },
  {
    dateIssued: 'March 2022',
    title: 'Graph Developer - Professional',
    issuer: 'Apollo GraphQL',
    certificateUrl:
      'hhttps://www.apollographql.com/tutorials/certifications/990c587f-77c7-40f4-b22b-d2fcd9d1b7fe',
  },
];

export const educations: Education[] = [
  {
    dateStart: 'September 2017',
    dateEnd: 'June 2021',
    title: "Bachelor's degree, Software Engineering",
    issuer: 'Kharkiv National University of Radioelectronics',
    issuerUrl: 'https://nure.ua/en/',
  },
];

export const skills: string[] = [
  'TypeScript',
  'JavaScript',
  'React',
  'Redux / MobX',
  'GraphQL',
  'Node',
  'Git',
  'Tailwind',
  'Styled Components',
  'Material UI',
  'SASS',
  'Golang',
  'Docker',
  'PostgreSQL',
  'MySQL',
  'Next.js',
  'Nest',
  'AWS',
];

export const languages: Language[] = [
  { name: 'Ukranian', progress: 100 },
  { name: 'English', progress: 80 },
  { name: 'Russian', progress: 100 },
];
