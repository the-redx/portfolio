import type { Metadata } from 'next';

import './styles.scss';

export const metadata: Metadata = {
  title: "Valentine's day",
  description: 'Valentine day',
  icons: [
    {
      url: '/teddy-bear.svg',
      rel: 'icon',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
