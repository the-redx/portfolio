import { NextRequest, NextResponse } from 'next/server';
import { downloadGoogleDocWithAuth } from '@/constants/gdocs';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const googleDocsId = process.env.GOOGLE_DOCS_CV_ID;

  if (!googleDocsId) {
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }

  try {
    const pdfBuffer = await downloadGoogleDocWithAuth(googleDocsId);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Illia Illiashenko CV, Senior Software Engineer.pdf"',
        'Cache-Control': `public, max-age=3600`,
        'Content-Length': pdfBuffer.byteLength.toString(),
      },
    });
  } catch (error: unknown) {
    console.error(`Google Drive API Error:`, error);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 502 });
  }
}
