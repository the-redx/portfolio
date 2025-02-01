import { Link } from '@/types/link.type';
import { getBody } from '@/utils/getBody';
import { requestLinksAPI } from '@/utils/links';
import { getOrCreateUserSession } from '@/utils/session';
import { NextRequest } from 'next/server';
import { object, string } from 'yup';

const createLinkDto = object({
  name: string().min(3).max(100),
  url: string().url().required().max(5000),
  id: string()
    .max(30)
    .matches(/^[a-zA-Z0-9- ]+$/g, 'Should contain only letters, numbers, dashes and spaces'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await getBody(request);
    const validatedBody = await createLinkDto.validate(body);

    const session = await getOrCreateUserSession();
    if (!session) {
      throw new Error('User session is required');
    }

    const data = await requestLinksAPI<Link>('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': session.userId,
      },
      body: JSON.stringify(validatedBody),
    });

    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const rawLimit = Number(request.nextUrl.searchParams.get('limit'));
  const rawOffset = Number(request.nextUrl.searchParams.get('offset'));

  const limit = !isNaN(rawLimit) ? rawLimit : 5;
  const offset = !isNaN(rawOffset) ? rawOffset : 0;

  try {
    const session = await getOrCreateUserSession();
    if (!session) {
      throw new Error('User session is required');
    }

    const data = await requestLinksAPI<{ links: Link[] }>('', {
      method: 'GET',
      headers: { 'X-User-ID': session.userId },
    });

    return Response.json(
      {
        hasMore: data.links.length > offset + limit,
        links: data.links.slice(offset, offset + limit),
      },
      { status: 200 },
    );
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
