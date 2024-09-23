import React from 'react';

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-crema-100 p-7 w-full flex justify-between items-center">
      <div className="flex items-center text-opacity-60 gap-6 text-sm">
        <a href="/">Home</a>

        <a target="_blank" href="https://api.illiashenko.dev/docs">
          API
        </a>

        <a href="/link-shortener">Link shortener</a>
      </div>

      <div className="text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Illia Illiashenko</p>
      </div>
    </footer>
  );
};

export default Footer;
