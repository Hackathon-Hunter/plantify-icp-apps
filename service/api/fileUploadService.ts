import supabase from '../supabase/client';
import { v4 as uuidv4 } from 'uuid';

// File types for organization
type FileType = 'pitchDeck' | 'demoVideo' | 'logo' | 'productImage';

// Result interface for file uploads
interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// The single bucket name for all uploads
const BUCKET_NAME = 'plantify-uploads';

/**
 * Upload a single file to Supabase Storage
 * @param file The file to upload
 * @param fileType Type of file for organizing in storage buckets
 * @returns UploadResult with success status and URL or error
 */
export const uploadFile = async (file: File, fileType: FileType): Promise<UploadResult> => {
  try {
    // Generate a unique filename to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    // Create path based on file type
    const filePath = `${fileType}/${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);
      
    if (error) {
      console.error('Supabase storage error:', error);
      return { success: false, error: error.message };
    }
    
    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);
      
    return {
      success: true,
      url: publicUrl
    };
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown upload error'
    };
  }
};

/**
 * Upload multiple files to Supabase Storage
 * @param files Array of files to upload
 * @param fileType Type of files for organizing in storage buckets
 * @returns Array of UploadResult with success status and URL or error for each file
 */
export const uploadMultipleFiles = async (files: File[], fileType: FileType): Promise<UploadResult[]> => {
  const uploadPromises = files.map(file => uploadFile(file, fileType));
  return Promise.all(uploadPromises);
};
