/**
 * Validates and parses the Google Service Account configuration
 */
export function validateGoogleServiceAccount() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const googleDocsId = process.env.GOOGLE_DOCS_CV_ID;

  if (!serviceAccountKey) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is required');
  }

  if (!googleDocsId) {
    throw new Error('GOOGLE_DOCS_CV_ID environment variable is required');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    
    const requiredFields = ['client_email', 'private_key', 'project_id'];
    for (const field of requiredFields) {
      if (!serviceAccount[field]) {
        throw new Error(`Missing required field '${field}' in service account configuration`);
      }
    }

    return { serviceAccount, googleDocsId };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format in GOOGLE_SERVICE_ACCOUNT_KEY');
    }
    throw error;
  }
}
