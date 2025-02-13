import React from 'react';

import { Space_Mono } from 'next/font/google';
import { FaLinkedinIn, FaGithub, FaTelegramPlane, FaRegEnvelope } from 'react-icons/fa';

export const fontSpaceMono = Space_Mono({
  weight: ['400'],
  subsets: [],
  style: 'normal',
});

export interface PortfolioCardProps {}

const PortfolioCard: React.FC<PortfolioCardProps> = () => {
  return (
    <div
      className="bg-transparent bg-cover bg-fixed relative w-full h-lvh flex justify-center items-center"
      style={{ backgroundImage: 'url(images/cover_bg_3.jpg)' }}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-crema-100 opacity-85"></div>

      <div className="z-10">
        <div
          className="bg-cover bg-center bg-no-repeat relative h-[12.5rem] w-[12.5rem] mx-auto mb-8 rounded-full"
          style={{ backgroundImage: 'url(images/profile.jpg)' }}
        />

        <div className="text-center my-8">
          <h1 className="text-4xl mb-4">Illia Illiashenko</h1>

          <h3 className={fontSpaceMono.className}>Sofware Enginner / Web UI</h3>
        </div>

        <ul className="my-8 flex justify-center items-center gap-8">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:illia@illiashenko.dev"
              className="text-4xl"
            >
              <FaRegEnvelope />
            </a>
          </li>

          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/the-redx/"
              className="text-4xl"
            >
              <FaGithub />
            </a>
          </li>

          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/theredx/"
              className="text-4xl"
            >
              <FaLinkedinIn />
            </a>
          </li>

          <li>
            <a target="_blank" rel="noreferrer" href="https://t.me/imredx" className="text-4xl">
              <FaTelegramPlane />
            </a>
          </li>
        </ul>

        <div className="flex justify-center">
          <a
            href="/Illia Illiashenko CV, Senior Frontend Engineer.pdf"
            target="_blank"
            type="button"
            className="py-3 px-4 text-sm font-semibold border-solid border bg-crema-400 text-crema-100 hover:bg-transparent hover:text-crema-400 rounded-full transition-all duration-300"
            download
            rel="noreferrer"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
