import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './global.scss';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Illiashenko Illia - Portfolio',
  description: 'Illiashenko Illia - My personal portfolio',
  creator: 'Illia Illiashenko',
  metadataBase: new URL('https://illiashenko.dev'),
  manifest: '/manifest.webmanifest',
  keywords: [],
  icons: ['/favicon.png'],
  twitter: {
    title: 'Illiashenko Illia - Portfolio',
    description: 'Illiashenko Illia - My personal portfolio',
    images: ['/favicon.png'],
    site: 'https://illiashenko.dev',
  },
  openGraph: {
    title: 'Illiashenko Illia - Portfolio',
    description: 'Illiashenko Illia - My personal portfolio',
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
      <Head>
        <script key="schema" type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org/',
            '@type': 'Person',
            name: 'Illia Illiashenko',
            jobTitle: 'Software Engineer',
            email: 'illia@illiashenko.dev',
            homeLocation: 'Warsaw, Poland',
            url: 'https://illiashenko.dev',
          })}
        </script>
      </Head>

      <body className={roboto.className}>{children}</body>
    </html>
  );
}
