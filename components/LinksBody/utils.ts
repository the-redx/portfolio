const LIMIT = 5;

export const fetchLinks = async ({ pageParam }: { pageParam: unknown }) => {
  const res = await fetch(`/api/links?offset=${pageParam}&limit=${LIMIT}`, { method: 'GET' });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};

export const createLink = async (variables: { name?: string; id?: string; url: string }) => {
  const res = await fetch('/api/links', {
    method: 'POST',
    body: JSON.stringify({
      name: variables.name || undefined,
      id: variables.id || undefined,
      url: variables.url,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};

export const removeLink = async (variables: { linkId: string }) => {
  const res = await fetch(`/api/links/${variables.linkId}`, { method: 'DELETE' });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};
