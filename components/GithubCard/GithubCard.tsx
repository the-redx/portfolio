import React from 'react';
import { Card } from '@/components/Card';
import { FaLink, FaRegStar } from 'react-icons/fa';
import { BiGitRepoForked } from 'react-icons/bi';
import { getBgByLanguage } from './utils';

export interface GithubCardProps {
  title: string;
  description?: string;
  stars: number;
  forks: number;
  lang: string;
  href?: string;
}

const GithubCard: React.FC<GithubCardProps> = ({
  title,
  description,
  stars,
  forks,
  lang,
  href,
}) => {
  const backgroundColor = getBgByLanguage(lang);

  return (
    <Card>
      <div className="flex flex-col justify-between">
        <div>
          <a className="flex items-center truncate" href={href} target="_blank">
            <div className="tracking-wide flex items-center gap-2">
              <FaLink />
              <h3 className="text-lg" title={title}>
                {title}
              </h3>
            </div>
          </a>
          <p className="mb-5 mt-1 text-base-content text-sm h-[40px] overflow-ellipsis line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex justify-between text-sm truncate text-crema-500">
          <div className="flex flex-grow gap-3">
            <div className="flex items-center gap-1">
              <FaRegStar className="relative top-[-1px]" />
              <span>{stars}</span>
            </div>

            <div className="flex items-center gap-1">
              <BiGitRepoForked />
              <span>{forks}</span>
            </div>
          </div>

          {lang && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor }} />
              <span>{lang}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GithubCard;
