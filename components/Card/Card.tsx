import React from 'react';
import cn from 'classnames';

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  isParentCard?: boolean;
  topButton?: { name: string; link: string };
}

const Card: React.FC<CardProps> = ({ title, children, isParentCard, topButton }) => {
  return (
    <section
      className={cn(
        'card shadow-lg compact bg-base-100 p-4 text-sm leading-5 gap-2 rounded-2xl',
        isParentCard ? 'bg-crema-200' : 'bg-crema-100',
      )}
    >
      {title && (
        <div className="mx-3 flex items-center justify-between">
          <h2 className="text-xl">{title}</h2>

          {topButton && (
            <a target="_blank" href={topButton.link}>
              {topButton.name}
            </a>
          )}
        </div>
      )}

      <div className="p-3 flow-root">{children}</div>
    </section>
  );
};

export default Card;
