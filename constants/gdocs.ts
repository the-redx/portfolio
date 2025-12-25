import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { validateGoogleServiceAccount } from '@/utils/google-auth';

export async function getAuthenticatedGoogleDocsUrl(googleDocsId: string): Promise<string> {
  const { serviceAccount } = validateGoogleServiceAccount();

  try {
    const auth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const { token } = await auth.getAccessToken();

    if (!token) {
      throw new Error('Failed to get access token');
    }

    return `https://docs.google.com/document/d/${googleDocsId}/export?format=pdf&access_token=${token}`;
  } catch (error) {
    console.error('Error getting authenticated Google Docs URL:', error);
    throw new Error('Failed to authenticate with Google Drive');
  }
}

export async function downloadGoogleDocWithAuth(googleDocsId: string): Promise<ArrayBuffer> {
  const { serviceAccount } = validateGoogleServiceAccount();

  try {
    const auth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.export(
      { fileId: googleDocsId, mimeType: 'application/pdf' },
      { responseType: 'arraybuffer' },
    );

    return response.data as ArrayBuffer;
  } catch (error) {
    console.error('Error downloading Google Doc with auth:', error);

    if (error && typeof error === 'object' && 'code' in error) {
      const apiError = error as { code: number; message: string };

      switch (apiError.code) {
        case 401:
          throw new Error('Authentication failed. Check your service account credentials.');
        case 403:
          throw new Error(
            'Access denied. Ensure the document is shared with your service account.',
          );
        case 404:
          throw new Error('Document not found. Check the document ID.');
        default:
          throw new Error(`Google Drive API error: ${apiError.message}`);
      }
    }

    throw new Error('Failed to download document from Google Drive');
  }
}
