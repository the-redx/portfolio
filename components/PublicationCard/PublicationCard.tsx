import React from 'react';
import { Card } from '@/components/Card';
import Image from 'next/image';
import { formatDistance } from 'date-fns';

export interface PublicationCardProps {
  title: string;
  publicationDate: string | number | Date;
  description: string;
  image?: string;
  tags?: string[];
  href?: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  title,
  image,
  publicationDate,
  description,
  tags,
  href,
}) => {
  const formattedDate = formatDistance(publicationDate, new Date(), { addSuffix: true });

  return (
    <Card>
      <div className="h-full w-full">
        <div className="flex items-center md:items-start flex-col md:flex-row gap-4">
          {image && (
            <div className="relative inline-flex mb-5 md:mb-0">
              <div
                className="w-24 h-24 mt-1"
                style={{
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  maskImage: `url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e")`,
                }}
              >
                <Image src={image} alt="thumbnail" fill className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <div className="flex-grow text-center md:text-left flex flex-col gap-3">
            <div>
              <a href={href} target="_blank" className="font-medium block text-base">
                {title}
              </a>

              <span className="text-xs text-crema-500">{formattedDate}</span>
            </div>

            <p className="m-0 text-sm line-clamp-4">{description}</p>

            {tags?.length && (
              <div className="flex items-center flex-wrap justify-center md:justify-start gap-2">
                {tags.map(tag => (
                  <div
                    key={tag}
                    className="py-2 px-4 text-xs leading-3 rounded-full bg-crema-200 text-crema-500"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PublicationCard;
