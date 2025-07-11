import { useState, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { registerFarmer } from '@/service/farmerService';
import type { RegisterFarmerRequest, FarmerRegistrationResult } from '@/service/types';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  governmentId: string;
}

interface FileUpload {
  file: File | null;
  preview: string | null;
}

interface UploadedDocuments {
  governmentIdPhoto: FileUpload;
  selfiePhoto: FileUpload;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  governmentId: "",
};

const initialDocuments: UploadedDocuments = {
  governmentIdPhoto: { file: null, preview: null },
  selfiePhoto: { file: null, preview: null },
};

export const useFarmerRegistration = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [documents, setDocuments] = useState<UploadedDocuments>(initialDocuments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Refs for file inputs
  const governmentIdInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  // Form validation
  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.fullName.trim() &&
          formData.email.trim() &&
          formData.phoneNumber.trim() &&
          formData.governmentId.trim() &&
          isValidEmail(formData.email)
        );
      case 2:
        return !!(documents.governmentIdPhoto.file);
      case 3:
        return !!(documents.selfiePhoto.file);
      default:
        return true;
    }
  }, [formData, documents]);

  const isValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const isStepValid = useMemo(() => validateStep(currentStep), [validateStep, currentStep]);

  // Form validation helpers
  const getValidationErrorMessage = useCallback((step: number): string => {
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) return 'Full name is required';
        if (!formData.email.trim()) return 'Email is required';
        if (!isValidEmail(formData.email)) return 'Please enter a valid email address';
        if (!formData.phoneNumber.trim()) return 'Phone number is required';
        if (!formData.governmentId.trim()) return 'Government ID is required';
        return '';
      case 2:
        return 'Please upload your government ID photo';
      case 3:
        return 'Please upload your selfie photo';
      default:
        return '';
    }
  }, [formData, isValidEmail]);

  // Form handlers
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const handleFileUpload = useCallback((
    type: 'governmentIdPhoto' | 'selfiePhoto',
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload only image files (PNG, JPG, JPEG)');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setDocuments(prev => ({
        ...prev,
        [type]: { file, preview }
      }));
    };
    reader.readAsDataURL(file);
    setError(null);
  }, []);

  const handleRemoveFile = useCallback((type: 'governmentIdPhoto' | 'selfiePhoto') => {
    setDocuments(prev => ({
      ...prev,
      [type]: { file: null, preview: null }
    }));
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!validateStep(currentStep)) {
      setError(getValidationErrorMessage(currentStep));
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  }, [currentStep, validateStep, getValidationErrorMessage]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  }, [currentStep]);

  // Registration submission
  const handleSubmitRegistration = useCallback(async () => {
    if (!validateStep(3)) {
      setError('Please complete all required fields and upload all documents');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare registration data
      const registrationRequest: RegisterFarmerRequest = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        governmentId: formData.governmentId.trim(),
      };

      // TODO: Upload documents to a storage service and get file hashes
      // For now, the documents will be handled separately after registration

      // Call registration service
      const result: FarmerRegistrationResult = await registerFarmer(registrationRequest);

      if ('Success' in result) {
        setSuccess(true);
        setCurrentStep(4);
        console.log('Farmer registered successfully with ID:', result.Success.toString());
      } else if ('Error' in result) {
        setError(`Registration failed: ${result.Error}`);
      } else if ('AlreadyRegistered' in result) {
        setError('You are already registered as a farmer with this account.');
      } else if ('InvalidData' in result) {
        setError(`Invalid data: ${result.InvalidData}`);
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep]);

  // File input triggers
  const triggerGovernmentIdUpload = useCallback(() => {
    governmentIdInputRef.current?.click();
  }, []);

  const triggerSelfieUpload = useCallback(() => {
    selfieInputRef.current?.click();
  }, []);

  // Navigation
  const navigateToDashboard = useCallback(() => {
    router.push('/farmer/dashboard');
  }, [router]);

  // Camera functionality for selfie (future enhancement)
  const takeSelfie = useCallback(() => {
    // TODO: Implement camera capture functionality
    console.log('Camera capture functionality to be implemented');
  }, []);

  return {
    // State
    currentStep,
    formData,
    documents,
    isSubmitting,
    error,
    success,

    // Validation
    isStepValid,
    validateStep,

    // Refs
    governmentIdInputRef,
    selfieInputRef,

    // Handlers
    handleInputChange,
    handleFileUpload,
    handleRemoveFile,
    handleNext,
    handlePrevious,
    handleSubmitRegistration,
    triggerGovernmentIdUpload,
    triggerSelfieUpload,
    takeSelfie,
    navigateToDashboard,

    // Utility
    setError,
    getValidationErrorMessage,
  };
};

export type { FormData, UploadedDocuments, FileUpload }; 