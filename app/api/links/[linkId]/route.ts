import { Link } from '@/types/link.type';
import { requestLinksAPI } from '@/utils/links';
import { getOrCreateUserSession } from '@/utils/session';
import { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ linkId: string }> }) {
  try {
    const { linkId } = await params;
    const session = await getOrCreateUserSession();
    if (!session) {
      throw new Error('User session is required');
    }

    const data = await requestLinksAPI<Link>(`/${linkId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': session.userId,
      },
    });

    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
