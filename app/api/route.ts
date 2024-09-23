import { getBody } from '@/utils/getBody';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await getBody(request);

  if (body?.revalidatePaths && Array.isArray(body.revalidatePaths)) {
    for (const tag of body.revalidatePaths) {
      revalidateTag(tag);
    }

    return Response.json({ ok: true }, { status: 200 });
  }

  return Response.json({ error: 'Invalid request body' }, { status: 400 });
}
