'use client';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  elemBeforeInput?: React.ReactNode;
  elemAfterInput?: React.ReactNode;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  elemBeforeInput,
  elemAfterInput,
  errorMessage,
  ...props
}) => {
  return (
    <div className="flex relative">
      {elemBeforeInput && (
        <div className="flex items-center outline-none bg-crema-400 rounded-l-lg text-crema-100">
          {elemBeforeInput}
        </div>
      )}

      <input
        {...props}
        style={{
          ...(elemAfterInput ? {} : { borderTopRightRadius: 8, borderBottomRightRadius: 8 }),
          ...(elemBeforeInput ? {} : { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }),
        }}
        className="block flex-grow bg-white py-3 px-2 ring-1 ring-inset ring-crema-400 focus:ring-2 outline-none transition border-0"
      />

      {elemAfterInput && (
        <div className="flex items-center outline-none bg-crema-400 rounded-r-lg text-crema-100">
          {elemAfterInput}
        </div>
      )}

      {errorMessage && (
        <div className="absolute -bottom-5 text-left text-sm text-red-500 pl-2">{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
