import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = request.bodyUsed ? await request.json() : {};

  if (body.revalidatePaths && Array.isArray(body.revalidatePaths)) {
    for (const tag of body.revalidatePaths) {
      revalidateTag(tag);
    }

    return Response.json({
      status: 200,
      message: 'success',
    });
  }

  return Response.json({
    status: 400,
    error: 'Invalid request body',
  });
}
