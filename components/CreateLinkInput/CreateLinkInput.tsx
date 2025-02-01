'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@/types/link.type';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface FormData {
  url: string;
  name?: string;
  id?: string;
}

export interface CreateLinkInputProps {
  onCreateLink: (url: FormData) => Promise<Link>;
}

const CreateLinkInput: React.FC<CreateLinkInputProps> = ({ onCreateLink }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  const onSubmit: SubmitHandler<FormData> = data => {
    onCreateLink(data)
      .then(() => {
        reset();
        setIsFocused(false);
      })
      .catch(err => setError('root.serverError', { message: err.message }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="flex flex-col absolute w-96 gap-3 z-20 bg-white p-6 rounded-lg items-stretch"
      >
        <div>
          <div className="flex">
            <input
              {...register('url', {
                required: { value: true, message: 'Field is required' },
                maxLength: { value: 5000, message: 'Maximum length is 5000' },
              })}
              type="url"
              placeholder="Enter the link here"
              onFocus={() => setIsFocused(true)}
              style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
              className="block flex-grow bg-white py-3 px-2 ring-1 ring-inset ring-crema-400 focus:ring-2 outline-none transition border-0"
            />

            <div className="flex items-center outline-none bg-crema-400 rounded-r-lg text-crema-100">
              <button
                type="submit"
                className="text-center h-full hover:bg-crema-600 px-3 rounded-r-lg transition"
              >
                Create
              </button>
            </div>
          </div>

          <div className="text-left text-sm text-red-500 pl-2">{errors.url?.message}</div>
        </div>

        {isFocused && (
          <>
            <div>
              <input
                {...register('name', {
                  minLength: { value: 3, message: 'Minimum length is 3' },
                  maxLength: { value: 100, message: 'Maximum length is 100' },
                })}
                type="text"
                placeholder="Enter the name (optional)"
                className="block w-full bg-white py-3 px-2 ring-1 ring-inset ring-crema-400 focus:ring-2 outline-none transition rounded-lg"
              />

              <div className="text-left text-sm text-red-500 pl-2">{errors.name?.message}</div>
            </div>

            <div>
              <input
                {...register('id', {
                  maxLength: { value: 100, message: 'Maximum length is 30' },
                  pattern: {
                    value: /^[0-9a-z- ]+$/gi,
                    message: 'URL can only contain letters, numbers, dash and spaces',
                  },
                })}
                type="text"
                placeholder="Enter the short URL (optional)"
                className="block w-full bg-white py-3 px-2 ring-1 ring-inset ring-crema-400 focus:ring-2 outline-none transition rounded-lg"
              />

              <div className="text-left text-sm text-red-500 pl-2">{errors.id?.message}</div>
            </div>
          </>
        )}

        <div className="text-left text-sm text-red-500 pl-2">
          {errors.root?.serverError?.message}
        </div>
      </form>

      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-10 transition-opacity duration-300"
        style={
          isFocused
            ? { opacity: '.7', visibility: 'visible' }
            : { opacity: '0', visibility: 'hidden' }
        }
      />
    </>
  );
};

export default CreateLinkInput;
