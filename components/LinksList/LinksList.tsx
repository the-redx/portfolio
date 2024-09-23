'use client';
import { Link } from '@/types/link.type';
import React, { useCallback } from 'react';
import { FaRegCopy, FaRegTrashCan, FaEye } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export interface LinksListProps {
  hasMore: boolean;
  links: Link[];
  isLoading: boolean;
  onClickMore: () => void;
  onClickRemove: (link: Link) => void;
}

const LinksList: React.FC<LinksListProps> = ({
  links,
  hasMore,
  isLoading,
  onClickMore,
  onClickRemove,
}) => {
  const handleCopyLink = useCallback(
    (link: Link) => () => {
      navigator.clipboard
        .writeText(link.shortUrl)
        .then(() => toast.success('Link copied to clipboard'))
        .catch(() => toast.error('Failed to copy link'));
    },
    [],
  );

  return (
    <div className="flex items-center gap-3 flex-col px-8 py-4">
      {links.map(link => (
        <div
          key={link.id}
          className="bg-crema-100 flex items-center gap-3 rounded-xl p-4 text-sm leading-6 w-full sm:w-80 relative"
          style={{
            opacity: 0,
            transform: 'translateX(100%)',
            animation: 'show 400ms 100ms cubic-bezier(0.38, 0.97, 0.56, 0.76) forwards',
          }}
        >
          <div className="flex flex-grow flex-col gap-0.5 overflow-hidden">
            <a
              href={link.url}
              title={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-start truncate"
            >
              {link.url}
            </a>
            <span className="flex items-center gap-1 text-crema-400 font-semibold">
              <FaEye /> {link.clicks}
            </span>
          </div>

          <div
            className="p-3 rounded-lg cursor-pointer transition hover:bg-crema-200"
            onClick={handleCopyLink(link)}
          >
            <FaRegCopy className="h-4 w-4" />
          </div>

          <div
            className="p-3 rounded-lg cursor-pointer transition hover:bg-crema-200"
            onClick={() => onClickRemove(link)}
          >
            <FaRegTrashCan className="h-4 w-4" />
          </div>
        </div>
      ))}

      {hasMore && (
        <button
          onClick={onClickMore}
          disabled={isLoading}
          className="flex items-center p-3 outline-none bg-crema-400 rounded-lg text-crema-100 hover:bg-crema-600 transition"
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Load More
        </button>
      )}
    </div>
  );
};

export default LinksList;
