import { Certification, Education, Experience, Language } from '@/types/profile.type';

const exprerience: Experience[] = [
  {
    dateStart: 'October 2019',
    dateEnd: 'March 2020',
    position: 'Freelancer',
    company: '',
  },
  {
    dateStart: 'March 2020',
    dateEnd: 'October 2021',
    position: 'Software Engineer',
    company: 'NIX',
    companyUrl: 'https://www.nixsolutions.com/',
  },
  {
    dateStart: 'November 2021',
    dateEnd: 'May 2023',
    position: 'Software Engineer',
    company: 'SoftServe',
    companyUrl: 'https://softserveinc.com/',
  },
  {
    dateStart: 'May 2023',
    position: 'Senior Software Engineer',
    company: 'SoftServe',
    companyUrl: 'https://softserveinc.com/',
  },
];

const certifications: Certification[] = [
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

const educations: Education[] = [
  {
    dateStart: 'September 2017',
    dateEnd: 'June 2021',
    title: "Bachelor's degree, Software Engineering",
    issuer: 'Kharkiv National University of Radioelectronics',
    issuerUrl: 'https://nure.ua/en/',
  },
];

const skills: string[] = [
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

const languages: Language[] = [
  { name: 'Ukranian', progress: 100 },
  { name: 'English', progress: 80 },
  { name: 'Russian', progress: 100 },
];

export async function getProfileData() {
  return {
    exprerience,
    certifications,
    educations,
    skills,
    languages,
  };
}
