import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../global.scss';

import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Link Shortener',
  description: 'Short your links',
  creator: 'Illia Illiashenko',
  keywords: [],
  icons: ['/favicon.png'],
  twitter: {
    title: 'Link Shortener',
    description: 'Short your links',
    images: ['/favicon.png'],
    site: 'https://illiashenko.dev/link-shortener',
  },
  openGraph: {
    title: 'Link Shortener',
    description: 'Short your links',
    url: 'https://illiashenko.dev/link-shortener',
    images: ['/favicon.png'],
    locale: 'en',
    emails: ['illia@illiashenko.dev'],
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
