import { getBody } from '@/utils/getBody';
import { createLink, getLinksData } from '@/utils/links';
import { getOrCreateUserSession } from '@/utils/session';
import { NextRequest } from 'next/server';
import { object, string } from 'yup';

const createLinkDto = object({
  url: string().url().required(),
  shortUrl: string()
    .optional()
    .matches(/^[a-zA-Z0-9-]+$/g, 'Should contain only letters, numbers and dashes'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await getBody(request);
    const validatedBody = await createLinkDto.validate(body);

    const session = await getOrCreateUserSession();
    if (!session) {
      throw new Error('User session is required');
    }

    const createdLink = await createLink(session.userId, validatedBody);

    return Response.json(createdLink, { status: 200 });
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
    const links = await getLinksData(session?.userId ?? '', { limit, offset });

    return Response.json(links, { status: 200 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
