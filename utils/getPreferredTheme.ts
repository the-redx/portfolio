const PREFERRED_THEME_KEY_NAME = 'preferred-theme';

export const getPreferredTheme = (): 'white' | 'dark' => {
  const savedTheme =
    typeof window !== 'undefined' ? localStorage.getItem(PREFERRED_THEME_KEY_NAME) : null;

  if (savedTheme === 'dark' || savedTheme === 'white') {
    return savedTheme;
  }

  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'white';
};
