const LIMIT = 5;

export const fetchLinks = async ({ pageParam }: { pageParam: unknown }) => {
  const res = await fetch(`/api/links?offset=${pageParam}&limit=${LIMIT}`, { method: 'GET' });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};

export const createLink = async (variables: { url: string }) => {
  const res = await fetch('/api/links', {
    method: 'POST',
    body: JSON.stringify(variables),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};

export const removeLink = async (variables: { shortUrl: string }) => {
  const res = await fetch(variables.shortUrl, { method: 'DELETE' });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};
