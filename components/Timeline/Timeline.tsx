import React from 'react';

export type Timeline = {
  dateStart: string;
  dateEnd?: string;
  title: string;
  company: string;
  companyUrl?: string;
};

export interface TimelineProps {
  timeline: Timeline[];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  return (
    <ol className="relative border-solid border-l border-crema-400 border-opacity-30 flex flex-col gap-5">
      {timeline.map(line => (
        <li key={line.dateStart + line.dateEnd} className="ml-4">
          <div
            className="absolute w-2 h-2 bg-crema-400 rounded-full border border-crema-400 mt-1.5"
            style={{ left: '-4.5px' }}
          ></div>
          <div className="my-0.5 text-xs">
            {line.dateStart} - {line.dateEnd ?? 'Present'}
          </div>
          <h3 className="font-semibold">{line.title}</h3>
          <div className="font-normal">
            <a target="_blank" rel="noreferrer" href={line.companyUrl}>
              {line.company}
            </a>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
