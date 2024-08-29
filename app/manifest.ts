import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    lang: 'en',
    name: 'Illia Illiashenko - Portfolio',
    description: 'Illiashenko Illia - My personal portfolio',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    icons: [{ src: '/favicon.png' }],
  };
}
