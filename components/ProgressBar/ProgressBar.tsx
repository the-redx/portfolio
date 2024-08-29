import React from 'react';

export interface ProgressBarProps {
  title: string;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, progress }) => {
  return (
    <div className="flex items-center py-2 px-1 gap-3">
      <div className="w-20 font-medium text-crema-700">
        {title}
      </div>

      <div className="flex-grow w-full bg-crema-200 rounded-full h-2">
        <div className="bg-crema-400 h-2 rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
