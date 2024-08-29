import React from 'react';

export interface SkillsContentProps {
  skills: string[];
}

const SkillsContent: React.FC<SkillsContentProps> = ({ skills }) => {
  return (
    <div className="-m-1 flex flex-wrap justify-center">
      {skills.map(skill => (
        <div
          key={skill}
          className="m-1 text-xs inline-flex items-center font-bold leading-sm px-3 py-1 badge-primary bg-opacity-90 rounded-full bg-crema-400 text-crema-100"
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

export default SkillsContent;
