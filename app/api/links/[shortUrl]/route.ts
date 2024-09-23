import { deleteByShortUrl, getByShortUrl } from '@/utils/links';
import { getOrCreateUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { shortUrl: string } }) {
  try {
    const link = await getByShortUrl(params.shortUrl);

    return NextResponse.redirect(link.url);
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { shortUrl: string } }) {
  try {
    const session = await getOrCreateUserSession();
    if (!session) {
      throw new Error('User session is required');
    }

    const removedLinks = await deleteByShortUrl(session.userId, params.shortUrl);

    return Response.json({ removedLinks }, { status: 200 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
