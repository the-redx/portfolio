import React from 'react';

export interface InfoItemProps {
  title: string;
  text: string;
  link?: string;
  icon?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, title, text, link }) => {
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow gap-2 flex items-center my-1 text-crema-700 font-medium">
        <span className="relative top-[-1px]">{icon}</span> {title}
      </div>

      <div className="text-sm font-normal text-right mr-2 ml-3 break-words">
        <a target="_blank" rel="noreferrer" href={link}>
          {text}
        </a>
      </div>
    </div>
  );
};

export default InfoItem;
