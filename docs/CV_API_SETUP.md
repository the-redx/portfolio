# CV API Endpoint Setup

## Overview

The `/api/cv` endpoint allows you to serve your CV dynamically from Google Docs (including private documents) without needing to redeploy your application when you update your CV.

## Setup Instructions

### 1. Create a Google Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Enter a name and description
   - Click "Create and Continue"
   - Skip role assignment (click "Continue")
   - Click "Done"
5. Generate a Service Account Key:
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Select "JSON" format
   - Download the JSON file

### 2. Prepare Your Google Docs CV

1. Create or upload your CV to Google Docs
2. Share the document with your service account:
   - Click "Share" in the top right corner
   - Add your service account email (found in the JSON file as `client_email`)
   - Give "Viewer" permission
   - Uncheck "Notify people"
   - Click "Share"
3. Copy the document ID from the URL

### 3. Extract the Document ID

From a Google Docs URL like:
```
https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
```

The document ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### 4. Configure Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Document ID from Google Docs URL
GOOGLE_DOCS_CV_ID=your_google_docs_document_id_here

# Service Account JSON (as a single line string)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id",...}
```

**Important:** The `GOOGLE_SERVICE_ACCOUNT_KEY` should be the entire JSON content from the downloaded service account file, formatted as a single line string.

### 5. Deploy and Test

1. Deploy your application with the new environment variables
2. Test the endpoint by visiting `/api/cv` - it should download your CV as a PDF
3. The CV link in your portfolio will now automatically use the latest version from Google Docs

## Features

- **Private Document Support**: Access private Google Docs using service account authentication
- **Automatic PDF Generation**: Google Drive API automatically converts your document to PDF
- **Caching**: The endpoint caches responses for 1 hour to improve performance
- **Comprehensive Error Handling**: Proper error responses for authentication, permission, and access issues
- **Secure**: Uses service account authentication instead of exposing documents publicly

## API Endpoint Details

- **URL**: `/api/cv`
- **Method**: GET
- **Response**: PDF file with appropriate headers
- **Cache**: 1 hour cache control
- **Authentication**: Google Service Account (server-side)
- **Error Handling**: Returns appropriate HTTP status codes and error messages

## Security Considerations

1. **Service Account Security**: 
   - Keep your service account JSON file secure
   - Store it as an environment variable, not in your codebase
   - Use minimal permissions (only Google Drive read access)

2. **Document Permissions**:
   - Only share with your specific service account email
   - Use "Viewer" permission only
   - Don't make the document publicly accessible

## Troubleshooting

### Common Issues

1. **401 Authentication Error**: 
   - Check that `GOOGLE_SERVICE_ACCOUNT_KEY` is correctly formatted JSON
   - Verify the service account has Google Drive API access
   - Ensure the JSON contains all required fields

2. **403 Access Denied**: 
   - Verify the document is shared with your service account email
   - Check that the service account has "Viewer" permission on the document

3. **404 Document Not Found**: 
   - Verify the `GOOGLE_DOCS_CV_ID` is correct
   - Ensure the document exists and isn't deleted

4. **500 Configuration Error**:
   - Check that both environment variables are set
   - Verify the Google Drive API is enabled in your Google Cloud project

### Testing the Setup

You can test the endpoint directly:
```bash
curl -I /api/cv
```

This should return a 200 status code if everything is configured correctly.

### Environment Variable Formatting

The service account JSON should be formatted as a single line. You can use this command to format it:
```bash
cat path/to/your/service-account.json | tr -d '\n'
```

## Migration Notes

After successfully setting up the Google Docs CV endpoint, you can:

1. Remove the old CV file from the public folder:
   ```bash
   rm "public/Illia Illiashenko CV, Senior Frontend Engineer.pdf"
   ```

2. Test that the new endpoint works correctly before removing the old file

3. The portfolio component has been updated to use `/api/cv` instead of the static file
