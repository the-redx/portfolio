import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './global.scss';

export const metadata: Metadata = {
  title: 'Illia Illiashenko - Portfolio',
  description: 'Illia Illiashenko - My personal portfolio',
  creator: 'Illia Illiashenko',
  metadataBase: new URL('https://illiashenko.dev'),
  manifest: '/manifest.webmanifest',
  keywords: [],
  icons: ['/favicon.png'],
  twitter: {
    title: 'Illia Illiashenko - Portfolio',
    description: 'Illia Illiashenko - My personal portfolio',
    images: ['/favicon.png'],
    site: 'https://illiashenko.dev',
  },
  openGraph: {
    title: 'Illia Illiashenko - Portfolio',
    description: 'Illia Illiashenko - My personal portfolio',
    url: 'https://illiashenko.dev',
    images: ['/favicon.png'],
    locale: 'en',
    emails: ['illia@illiashenko.dev'],
  },
};

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
