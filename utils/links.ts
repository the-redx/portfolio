const linksApiBasePath = process.env.LINKS_API_PATH ?? 'http://localhost:4000/links';

export async function requestLinksAPI<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(linksApiBasePath + url, {
    ...options,
    headers: { ...options.headers, 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? 'Failed to fetch links');
  }

  return data;
}
