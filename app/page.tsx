import { Card } from '@/components/Card';
import { InfoItem } from '@/components/InfoItem';
import { PortfolioCard } from '@/components/PortfolioCard';
import { SkillsContent } from '@/components/SkillsContent';
import { Timeline } from '@/components/Timeline';

import { GithubCard } from '@/components/GithubCard';
import { ProgressBar } from '@/components/ProgressBar';
import { NoDataMessage } from '@/components/NoDataMessage';
import { FaGithub, FaHome, FaLinkedin, FaRegEnvelope, FaTelegram } from 'react-icons/fa';
import { Footer } from '@/components/Footer';
import { getProfile, getProjects } from '@/utils/portfolio-data';

export default async function HomePage() {
  const [profile, project] = await Promise.all([
    getProfile(),
    getProjects('the-redx'),
    // getPublications('imredx'),
  ]);

  return (
    <>
      <header role="banner">
        <PortfolioCard />
      </header>

      <main className="flex gap-4 bg-crema-300 p-4 lg:p-10 min-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box w-full">
          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <InfoItem title="Location" icon={<FaHome />} text="Warsaw, Poland" />

                <InfoItem
                  title="Telegram"
                  icon={<FaTelegram />}
                  text="@imredx"
                  link="https://t.me/imredx"
                />

                <InfoItem
                  title="GitHub"
                  icon={<FaGithub />}
                  text="the-redx"
                  link="https://github.com/the-redx"
                />

                <InfoItem
                  title="LinkedIn"
                  icon={<FaLinkedin />}
                  text="the-redx"
                  link="https://www.linkedin.com/in/theredx/"
                />

                <InfoItem
                  title="Email"
                  icon={<FaRegEnvelope />}
                  text="illia@illiashenko.dev"
                  link="mailto:illia@illiashenko.dev"
                />
              </Card>

              <Card title="Tech Stack">
                <SkillsContent skills={profile.skills} />
              </Card>

              <Card title="Languages">
                {profile.languages.map(lang => (
                  <ProgressBar key={lang.name} title={lang.name} progress={lang.progress} />
                ))}
              </Card>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-1 flex flex-col gap-6">
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="flex gap-6 flex-col lg:basis-1/2 basis-full">
                <Card title="Experience">
                  <Timeline
                    timeline={profile.exprerience.map(exp => ({
                      dateStart: exp.dateStart,
                      dateEnd: exp.dateEnd,
                      title: exp.position,
                      company: exp.company,
                      companyUrl: exp.companyUrl,
                    }))}
                  />
                </Card>
              </div>

              <div className="flex gap-6 flex-col lg:basis-1/2 basis-full">
                <Card title="Certification">
                  <Timeline
                    timeline={profile.certifications.map(cert => ({
                      dateStart: 'Issued',
                      dateEnd: cert.dateIssued,
                      title: cert.title,
                      company: cert.issuer,
                      companyUrl: cert.certificateUrl,
                    }))}
                  />
                </Card>

                <Card title="Education">
                  <Timeline
                    timeline={profile.educations.map(exp => ({
                      dateStart: exp.dateStart,
                      dateEnd: exp.dateEnd,
                      title: exp.title,
                      company: exp.issuer,
                      companyUrl: exp.issuerUrl,
                    }))}
                  />
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {project && (
                <Card
                  title="Projects"
                  isParentCard
                  topButton={{ name: 'See All', link: project.allUrl }}
                >
                  {project.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.items.map(repo => (
                        <GithubCard
                          key={repo.id}
                          href={repo.href}
                          title={repo.name}
                          forks={repo.forks}
                          stars={repo.stars}
                          lang={repo.language}
                          description={repo.description}
                        />
                      ))}
                    </div>
                  ) : (
                    <NoDataMessage />
                  )}
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
