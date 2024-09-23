'use client';
import React, { useCallback, useState } from 'react';
import { Input } from '@/components/Input';
import { Link } from '@/types/link.type';

export interface CreateLinkInputProps {
  onCreateLink: (url: string) => Promise<Link>;
}

const CreateLinkInput: React.FC<CreateLinkInputProps> = ({ onCreateLink }) => {
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateLink = useCallback(() => {
    onCreateLink(url)
      .then(() => setUrl(''))
      .catch(err => setErrorMessage(err.message));
  }, [url, onCreateLink]);

  return (
    <Input
      name="url"
      type="url"
      required
      value={url}
      placeholder="Enter the link here"
      onChange={e => {
        setUrl(e.target.value);
        setErrorMessage('');
      }}
      errorMessage={errorMessage ?? undefined}
      elemAfterInput={
        <button
          onClick={handleCreateLink}
          className="text-center h-full hover:bg-crema-600 px-3 rounded-r-lg transition"
        >
          Create
        </button>
      }
    />
  );
};

export default CreateLinkInput;
