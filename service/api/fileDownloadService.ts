import supabase from '../supabase/client';

/**
 * Download a file from Supabase Storage
 * @param url The public URL of the file to download
 * @returns void - Triggers browser download
 */
export const downloadFile = async (url: string): Promise<void> => {
  try {
    // Extract the file path from the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketName = 'plantify-uploads'; // Our bucket name
    
    // Get the file path after the bucket name
    const bucketIndex = pathParts.findIndex(part => part === bucketName);
    if (bucketIndex === -1) {
      throw new Error('Invalid file URL format');
    }
    
    const filePath = pathParts.slice(bucketIndex + 1).join('/');
    
    // Get file metadata to determine filename
    const { data: fileData, error: fileError } = await supabase.storage
      .from(bucketName)
      .download(filePath);
      
    if (fileError) {
      console.error('Error downloading file:', fileError);
      throw new Error(`Failed to download file: ${fileError.message}`);
    }
    
    // Create a download link and trigger download
    const downloadUrl = URL.createObjectURL(fileData);
    const fileName = pathParts[pathParts.length - 1];
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 100);
    
  } catch (error) {
    console.error('File download error:', error);
    throw error;
  }
};

/**
 * Get a signed URL for a file (useful for temporary access or for files not publicly accessible)
 * @param url The public URL of the file
 * @param expiresIn Expiration time in seconds (default: 60 seconds)
 * @returns Promise with the signed URL
 */
export const getSignedUrl = async (url: string, expiresIn = 60): Promise<string> => {
  try {
    // Extract the file path from the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketName = 'plantify-uploads'; // Our bucket name
    
    // Get the file path after the bucket name
    const bucketIndex = pathParts.findIndex(part => part === bucketName);
    if (bucketIndex === -1) {
      throw new Error('Invalid file URL format');
    }
    
    const filePath = pathParts.slice(bucketIndex + 1).join('/');
    
    // Get signed URL
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, expiresIn);
      
    if (error) {
      console.error('Error creating signed URL:', error);
      throw new Error(`Failed to create signed URL: ${error.message}`);
    }
    
    return data.signedUrl;
  } catch (error) {
    console.error('Signed URL error:', error);
    throw error;
  }
};
