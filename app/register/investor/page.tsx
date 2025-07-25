"use client";

import React, { JSX, useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InternetIdentityModal from "@/components/ui/InternetIdentityModal";

import {
  ArrowRight,
  CheckCircle,
  Wallet,
  Loader2,
  UserCheck,
} from "lucide-react";
import {
  registerInvestor,
  getMyInvestorProfile,
} from "@/service/api/plantifyService";
import { useAuth } from "@/hooks/useAuth";
import type { Investor } from "@/service/declarations/plantify-backend.did";
import DarkVeil from "@/components/ui/DarkVeil/DarkVeil";

interface InvestorFormValues {
  fullName: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
}

interface FormStatus {
  type: "success" | "error";
  message: string;
}

interface FormInputProps {
  name: keyof InvestorFormValues;
  placeholder: string;
  type?: string;
  [key: string]: unknown;
}

const validationSchema: Yup.ObjectSchema<InvestorFormValues> =
  Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters")
      .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
      .required("Full name is required"),

    email: Yup.string()
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters")
      .max(254, "Email must be less than 254 characters")
      .required("Email is required"),

    idNumber: Yup.string()
      .min(5, "ID number must be at least 5 characters")
      .max(50, "ID number must be less than 50 characters")
      .matches(
        /^[a-zA-Z0-9\-]+$/,
        "ID number can only contain letters, numbers, and hyphens"
      )
      .required("ID number is required"),

    phoneNumber: Yup.string()
      .min(8, "Phone number must be at least 8 characters")
      .max(20, "Phone number must be less than 20 characters")
      .matches(/^[\+]?[0-9\-\s\(\)]+$/, "Please enter a valid phone number")
      .required("Phone number is required"),
  });

const initialValues: InvestorFormValues = {
  fullName: "",
  email: "",
  idNumber: "",
  phoneNumber: "",
};

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  type = "text",
  ...props
}) => (
  <Field name={name}>
    {({
      field,
      meta,
    }: {
      field: import("formik").FieldInputProps<string>;
      meta: import("formik").FieldMetaProps<string>;
    }) => (
      <div className="flex flex-col gap-2 w-full">
        <Input
          {...field}
          {...props}
          type={type}
          placeholder={placeholder}
          bgClass={`bg-neutral-700 text-white placeholder:text-neutral-400 ${meta.touched && meta.error
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-600 focus:border-white"
            }`}
          className={`${meta.touched && meta.error
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-600 focus:border-white"
            }`}
        />
        <ErrorMessage name={name}>
          {(msg: string) => <span className="text-red-400 text-sm">{msg}</span>}
        </ErrorMessage>
      </div>
    )}
  </Field>
);

export default function RegisterInvestor(): JSX.Element {
  const { actor, isAuthenticated, login } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [existingInvestor, setExistingInvestor] = useState<Investor | null>(
    null
  );
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);

  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!isAuthenticated || !actor) return;

      setIsCheckingProfile(true);
      try {
        const profile = await getMyInvestorProfile(actor);

        if (profile) {
          setExistingInvestor(profile);
        } else {
          setExistingInvestor(null);
        }
      } catch (error) {
        console.error("❌ Error checking investor profile:", error);

        setExistingInvestor(null);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkExistingProfile();
  }, [isAuthenticated, actor]);

  const handleWalletConnection = async (): Promise<boolean> => {
    if (isAuthenticated && actor) {
      return true;
    }

    try {
      setIsConnecting(true);
      setConnectionError(null);

      await login();

      setIsModalOpen(false);

      return true;
    } catch (error) {
      console.error("❌ Wallet connection failed:", error);
      setConnectionError(
        "Failed to connect with Internet Identity. Please try again."
      );
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFormSubmission = async (
    values: InvestorFormValues
  ): Promise<{ success: boolean; message: string }> => {
    if (!isAuthenticated || !actor) {
      return {
        success: false,
        message: "Please connect your wallet first to continue registration.",
      };
    }

    if (existingInvestor) {
      return {
        success: false,
        message: `You are already registered as an investor with the name "${existingInvestor.fullName}". You can proceed to your dashboard.`,
      };
    }

    try {
      const investorRequest = {
        fullName: values.fullName,
        email: values.email,
      };

      const result = await registerInvestor(actor, investorRequest);

      if ("ok" in result) {
        setExistingInvestor(result.ok);
        return { success: true, message: "Registration successful!" };
      } else {
        console.error("❌ Investor registration failed:", result.err);
        throw new Error(`Registration failed: ${result.err}`);
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      };
    }
  };

  const handleSubmit = async (
    values: InvestorFormValues,
    { setSubmitting, setStatus, resetForm }: FormikHelpers<InvestorFormValues>
  ): Promise<void> => {
    try {
      if (!isAuthenticated || !actor) {
        setIsModalOpen(true);
        setSubmitting(false);
        return;
      }

      const result = await handleFormSubmission(values);

      if (result.success) {
        setStatus({ type: "success", message: result.message } as FormStatus);
        resetForm();
        setTimeout(() => {
          router.push("/investor/dashboard");
        }, 2000);
      } else {
        setStatus({ type: "error", message: result.message } as FormStatus);
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      } as FormStatus);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConnectAndSubmit = async (formikSubmit: () => void) => {
    if (!isAuthenticated || !actor) {
      setIsModalOpen(true);
    } else if (existingInvestor) {
      router.push("/investor/dashboard");
    } else {
      formikSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="fixed inset-0 z-0">
        <DarkVeil />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 max-w-6xl mx-auto">
          <Breadcrumbs segments={[{ label: "Back to Home" }]} backLink="/" />

          <span className="text-white text-3xl my-4 font-semibold">
            Sign Up as Investor
          </span>

          <Formik<InvestorFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              status,
              errors,
              touched,
              handleSubmit: formikHandleSubmit,
            }) => (
              <div className="bg-neutral-800 p-4 flex flex-col gap-3">
                {/* Loading Profile Check */}
                {isCheckingProfile && (
                  <div className="p-3 rounded text-sm flex items-center gap-2 bg-neutral-700 text-neutral-300 border border-neutral-600">
                    <Loader2
                      size={16}
                      className="animate-spin text-neutral-300"
                    />
                    <span>Checking your profile...</span>
                  </div>
                )}

                {/* Existing Investor Alert */}
                {existingInvestor && !isCheckingProfile && (
                  <div className="p-3 rounded text-sm flex items-center gap-2 bg-green-900/50 text-green-400 border border-green-700">
                    <UserCheck size={16} className="text-green-400" />
                    <div className="flex flex-col">
                      <span>Welcome back, {existingInvestor.fullName}!</span>
                      <span className="text-green-300 text-xs">
                        You are already registered as an investor.
                      </span>
                    </div>
                  </div>
                )}

                {/* Connection Status */}
                {!isAuthenticated && (
                  <div className="p-3 rounded text-sm flex items-center gap-2 bg-blue-900/50 text-blue-400 border border-blue-700">
                    <Wallet size={16} className="text-blue-400" />
                    <span>
                      Connect your wallet to check your registration status
                    </span>
                  </div>
                )}

                {isAuthenticated && !existingInvestor && !isCheckingProfile && (
                  <div className="p-3 rounded text-sm flex items-center gap-2 bg-green-900/50 text-green-400 border border-green-700">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Wallet connected successfully - Ready to register</span>
                  </div>
                )}

                {/* Form Status */}
                {status && (
                  <div
                    className={`p-3 rounded text-sm flex items-center gap-2 ${(status as FormStatus).type === "success"
                        ? "bg-green-900/50 text-green-400 border border-green-700"
                        : "bg-red-900/50 text-red-400 border border-red-700"
                      }`}
                  >
                    {(status as FormStatus).type === "success" && (
                      <CheckCircle size={16} className="text-green-400" />
                    )}
                    <span>{(status as FormStatus).message}</span>
                    {(status as FormStatus).type === "success" && (
                      <span className="text-green-300 text-xs ml-auto">
                        Redirecting to dashboard...
                      </span>
                    )}
                  </div>
                )}

                {/* Connection Error */}
                {connectionError && (
                  <div className="p-3 rounded text-sm flex items-center gap-2 bg-red-900/50 text-red-400 border border-red-700">
                    <span>{connectionError}</span>
                  </div>
                )}

                {/* Form Fields - Hidden if already registered */}
                {!existingInvestor && (
                  <>
                    {/* Full Name Field */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-white">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <FormInput
                        name="fullName"
                        placeholder="Enter your full name here"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-white">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <FormInput
                        name="email"
                        type="email"
                        placeholder="Enter your email here"
                      />
                    </div>

                    {/* ID Number Field */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-white">
                        ID Number <span className="text-red-500">*</span>
                      </label>
                      <FormInput
                        name="idNumber"
                        placeholder="Enter your ID number here"
                      />
                    </div>

                    {/* Phone Number Field */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-white">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <FormInput
                        name="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number here"
                      />
                    </div>
                  </>
                )}

                {/* Existing Investor Info Display */}
                {existingInvestor && (
                  <div className="bg-neutral-700 p-4 rounded">
                    <h3 className="text-white text-lg font-semibold mb-3">
                      Your Investor Profile
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Name:</span>
                        <span className="text-white">
                          {existingInvestor.fullName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Email:</span>
                        <span className="text-white">
                          {existingInvestor.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Registered:</span>
                        <span className="text-white">
                          {new Date(
                            Number(existingInvestor.registrationDate)
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Status:</span>
                        <span
                          className={
                            existingInvestor.isVerified
                              ? "text-green-400"
                              : "text-yellow-400"
                          }
                        >
                          {existingInvestor.isVerified
                            ? "Verified"
                            : "Pending Verification"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border border-dashed border-neutral-500"></div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => handleConnectAndSubmit(formikHandleSubmit)}
                    disabled={
                      isSubmitting ||
                      isConnecting ||
                      isCheckingProfile ||
                      (status as FormStatus)?.type === "success"
                    }
                    iconRight={
                      isConnecting || isCheckingProfile ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : existingInvestor ? (
                        <ArrowRight />
                      ) : (
                        <ArrowRight />
                      )
                    }
                    iconLeft={
                      !isAuthenticated && !isConnecting ? (
                        <Wallet size={16} />
                      ) : existingInvestor ? (
                        <UserCheck size={16} />
                      ) : undefined
                    }
                    size="lg"
                    className={`text-sm px-4 py-4 w-fit transition-all duration-200 ${isSubmitting ||
                        isConnecting ||
                        isCheckingProfile ||
                        (status as FormStatus)?.type === "success"
                        ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
                        : "bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white"
                      }`}
                  >
                    {isCheckingProfile
                      ? "Checking Profile..."
                      : isConnecting
                        ? "Connecting Wallet..."
                        : isSubmitting
                          ? "Signing Up..."
                          : (status as FormStatus)?.type === "success"
                            ? "Redirecting..."
                            : existingInvestor
                              ? "Go to Dashboard"
                              : !isAuthenticated
                                ? "Connect Wallet & Sign Up"
                                : "Sign Up"}
                  </Button>
                </div>

                {/* Alternative: Manual Dashboard Navigation for existing investors */}
                {existingInvestor && (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push("/investor/dashboard")}
                      variant="outline"
                      className="text-green-400 border-green-400 hover:bg-green-900/20 text-sm"
                    >
                      Continue to Investment Dashboard
                    </Button>
                  </div>
                )}

                {/* Form Summary for Development */}
                {process.env.NODE_ENV === "development" && (
                  <div className="mt-4 p-3 bg-neutral-900 rounded text-xs">
                    <details>
                      <summary className="text-neutral-400 cursor-pointer">
                        Debug Info (Development Only)
                      </summary>
                      <div className="mt-2 text-neutral-300">
                        <p>Errors: {JSON.stringify(errors, null, 2)}</p>
                        <p>Touched: {JSON.stringify(touched, null, 2)}</p>
                        <p>
                          Form Values: {JSON.stringify(initialValues, null, 2)}
                        </p>
                        <p>Is Submitting: {isSubmitting.toString()}</p>
                        <p>Status: {JSON.stringify(status, null, 2)}</p>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            )}
          </Formik>

          {/* Internet Identity Modal */}
          <InternetIdentityModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setConnectionError(null);
            }}
            title="Connect Your Wallet"
            subtitle="Connect with Internet Identity to register as an investor"
            buttons={[
              {
                text: isConnecting
                  ? "Connecting..."
                  : "Connect with Internet Identity",
                onClick: async () => {
                  await handleWalletConnection();
                },
                variant: "primary" as const,
                icon: isConnecting ? Loader2 : undefined,
                disabled: isConnecting,
              },
              {
                text: "Cancel",
                onClick: () => {
                  setIsModalOpen(false);
                  setConnectionError(null);
                },
                variant: "secondary" as const,
                disabled: isConnecting,
              },
            ]}
            showFeatures={true}
            features={[
              {
                icon: Wallet,
                text: "Secure blockchain-based authentication",
                iconColor: "text-white",
              },
              {
                icon: CheckCircle,
                text: "No usernames or passwords required",
                iconColor: "text-white",
              },
              {
                icon: ArrowRight,
                text: "One-click registration process",
                iconColor: "text-white",
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
