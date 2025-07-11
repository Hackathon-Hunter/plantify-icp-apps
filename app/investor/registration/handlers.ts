import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { registerInvestor } from '@/service/investorService';
import { RegisterInvestorRequest, InvestorRegistrationResult } from '@/service/types';

// Form validation types
export interface RegistrationFormData {
  fullName: string;
  email: string;
  agreeToTerms: boolean;
  subscribeToUpdates: boolean;
}

export interface RegistrationState {
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  registrationResult: InvestorRegistrationResult | null;
}

// Form validation
const validateFormData = (formData: RegistrationFormData): string[] => {
  const errors: string[] = [];

  // Full Name validation
  if (!formData.fullName.trim()) {
    errors.push('Full name is required');
  } else if (formData.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.push('Email address is required');
  } else if (!emailRegex.test(formData.email)) {
    errors.push('Please enter a valid email address');
  }

  // Terms agreement validation
  if (!formData.agreeToTerms) {
    errors.push('You must agree to the Terms & Conditions');
  }

  return errors;
};

export const useInvestorRegistrationHandlers = () => {
  const router = useRouter();

  // State management
  const [state, setState] = useState<RegistrationState>({
    currentStep: 1,
    isLoading: false,
    error: null,
    success: false,
    registrationResult: null,
  });

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    agreeToTerms: false,
    subscribeToUpdates: false,
  });

  // Form data handlers
  const handleInputChange = useCallback((field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (state.error) {
      setState(prev => ({ ...prev, error: null }));
    }
  }, [state.error]);

  // Registration submission
  const handleRegistration = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Validate form data
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: validationErrors.join(', ') 
        }));
        return;
      }

      // Prepare registration request
      const registrationRequest: RegisterInvestorRequest = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
      };

      // Call registration service
      const result = await registerInvestor(registrationRequest);

      // Handle result
      if ('Success' in result) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          success: true,
          currentStep: 2,
          registrationResult: result,
        }));
      } else if ('Error' in result) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.Error,
        }));
      } else if ('AlreadyRegistered' in result) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'An account with this email already exists. Please try logging in instead.',
        }));
      } else if ('InvalidData' in result) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.InvalidData,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'An unexpected error occurred during registration',
        }));
      }

    } catch (error) {
      console.error('Registration error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to register. Please check your connection and try again.',
      }));
    }
  }, [formData]);

  // Navigation handlers
  const handleExploreProjects = useCallback(() => {
    router.push('/investor/marketplace');
  }, [router]);

  const handleCompleteProfile = useCallback(() => {
    // Navigate to profile completion (could be a future feature)
    router.push('/investor/marketplace');
  }, [router]);

  const handleRetry = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      isLoading: false,
    }));
  }, []);

  const handleGoToLogin = useCallback(() => {
    // Navigate to login page (future feature)
    router.push('/investor/marketplace');
  }, [router]);

  // Step navigation
  const goToNextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 2),
    }));
  }, []);

  const goToPreviousStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  }, []);

  // Validation helpers
  const isFormValid = useCallback(() => {
    return formData.fullName.trim().length >= 2 &&
           formData.email.trim().length > 0 &&
           formData.agreeToTerms &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  }, [formData]);

  const getValidationErrors = useCallback(() => {
    return validateFormData(formData);
  }, [formData]);

  return {
    // State
    state,
    formData,
    
    // Computed values
    isFormValid: isFormValid(),
    validationErrors: getValidationErrors(),
    
    // Form handlers
    handleInputChange,
    handleRegistration,
    
    // Navigation handlers
    handleExploreProjects,
    handleCompleteProfile,
    handleRetry,
    handleGoToLogin,
    
    // Step navigation
    goToNextStep,
    goToPreviousStep,
    
    // Utility
    clearError: () => setState(prev => ({ ...prev, error: null })),
  };
}; 