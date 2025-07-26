"use client";

import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "@/components/ui/MultiStepForm";
import { Industry } from "@/service/declarations/plantify-backend.did";

import { ArrowRight, ChevronDown } from "lucide-react";

interface BasicInfoFormValues {
  companyName: string;
  industry: string;
  companyTagline: string;
  location: string;
  website: string;
}

// Industry options based on backend Industry type
const INDUSTRY_OPTIONS = [
  // Technology
  { value: "SoftwareDevelopment", label: "Software Development" },
  { value: "ArtificialIntelligence", label: "Artificial Intelligence" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "CloudComputing", label: "Cloud Computing" },
  { value: "MobileApps", label: "Mobile Apps" },
  { value: "WebDevelopment", label: "Web Development" },

  // Healthcare
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "MedicalDevices", label: "Medical Devices" },
  { value: "DigitalHealth", label: "Digital Health" },
  { value: "Pharmaceuticals", label: "Pharmaceuticals" },
  { value: "HealthcareServices", label: "Healthcare Services" },
  { value: "Telemedicine", label: "Telemedicine" },

  // Finance
  { value: "Fintech", label: "Fintech" },
  { value: "Payments", label: "Payments" },
  { value: "Cryptocurrency", label: "Cryptocurrency" },
  { value: "Insurance", label: "Insurance" },
  { value: "Banking", label: "Banking" },
  { value: "InvestmentPlatforms", label: "Investment Platforms" },

  // Education
  { value: "OnlineLearning", label: "Online Learning" },
  { value: "EducationTechnology", label: "Education Technology" },
  { value: "SkillTraining", label: "Skill Training" },
  { value: "LanguageLearning", label: "Language Learning" },
  { value: "CorporateTraining", label: "Corporate Training" },

  // Entertainment
  { value: "Gaming", label: "Gaming" },
  { value: "StreamingMedia", label: "Streaming Media" },
  { value: "ContentCreation", label: "Content Creation" },
  { value: "SocialMedia", label: "Social Media" },
  { value: "VirtualReality", label: "Virtual Reality" },

  // Commerce
  { value: "ECommerce", label: "E-Commerce" },
  { value: "Marketplace", label: "Marketplace" },
  { value: "RetailTechnology", label: "Retail Technology" },
  { value: "SupplyChain", label: "Supply Chain" },
  { value: "Logistics", label: "Logistics" },

  // Food
  { value: "FoodTechnology", label: "Food Technology" },
  { value: "RestaurantTech", label: "Restaurant Tech" },
  { value: "FoodDelivery", label: "Food Delivery" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "NutritionTech", label: "Nutrition Tech" },

  // Transportation
  { value: "Mobility", label: "Mobility" },
  { value: "ElectricVehicles", label: "Electric Vehicles" },
  { value: "AutonomousVehicles", label: "Autonomous Vehicles" },
  { value: "PublicTransport", label: "Public Transport" },
  { value: "DeliveryServices", label: "Delivery Services" },

  // Real Estate
  { value: "PropertyTechnology", label: "Property Technology" },
  { value: "Construction", label: "Construction" },
  { value: "SmartHomes", label: "Smart Homes" },
  { value: "RealEstateServices", label: "Real Estate Services" },

  // Energy
  { value: "RenewableEnergy", label: "Renewable Energy" },
  { value: "EnergyStorage", label: "Energy Storage" },
  { value: "SmartGrid", label: "Smart Grid" },
  { value: "CleanTech", label: "Clean Tech" },
  { value: "Sustainability", label: "Sustainability" },

  // Other
  { value: "Other", label: "Other" },
];

// Validation schema
const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .matches(/^[a-zA-Z0-9\s&.-]+$/, "Company name contains invalid characters")
    .required("Company name is required"),

  industry: Yup.string()
    .oneOf(
      INDUSTRY_OPTIONS.map((option) => option.value),
      "Please select a valid industry"
    )
    .required("Industry selection is required"),

  companyTagline: Yup.string()
    .min(10, "Company tagline must be at least 10 characters")
    .max(200, "Company tagline must be less than 200 characters")
    .required("Company tagline is required"),

  location: Yup.string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .matches(/^[a-zA-Z0-9\s,.-]+$/, "Location contains invalid characters")
    .required("Location is required"),

  website: Yup.string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .matches(
      /^https?:\/\/.+\..+/,
      "Website must start with http:// or https:// and include a domain"
    )
    .max(500, "Website URL must be less than 500 characters")
    .optional(),
});

interface FormInputProps {
  name: keyof BasicInfoFormValues;
  placeholder: string;
  type?: string;
  bgClass?: string;
  [key: string]: unknown;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  type = "text",
  bgClass = "bg-neutral-700 text-white",
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
          bgClass={`${bgClass} ${
            meta.touched && meta.error
              ? "border border-red-500 focus:border-red-500"
              : "border border-neutral-600 focus:border-white"
          }`}
          className={
            meta.touched && meta.error
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-600 focus:border-white"
          }
        />
        <ErrorMessage name={name}>
          {(msg: string) => <span className="text-red-400 text-sm">{msg}</span>}
        </ErrorMessage>
      </div>
    )}
  </Field>
);

interface FormSelectProps {
  name: keyof BasicInfoFormValues;
  bgClass?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  bgClass = "bg-neutral-700 text-white",
  children,
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
        <Select
          {...field}
          {...props}
          rightIcon={<ChevronDown />}
          bgClass={`${bgClass} ${
            meta.touched && meta.error
              ? "border border-red-500 focus:border-red-500"
              : "border border-neutral-600 focus:border-white"
          }`}
          className={
            meta.touched && meta.error
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-600 focus:border-white"
          }
        >
          {children}
        </Select>
        <ErrorMessage name={name}>
          {(msg: string) => <span className="text-red-400 text-sm">{msg}</span>}
        </ErrorMessage>
      </div>
    )}
  </Field>
);

export default function BasicInformation({
  nextStep,
  formData,
  updateFormData,
}: StepComponentProps) {
  // Initial values from form data or defaults
  const initialValues: BasicInfoFormValues = {
    companyName: formData?.companyName || "",
    industry: formData?.industry ? Object.keys(formData.industry)[0] : "",
    companyTagline: formData?.companyTagline || "",
    location: formData?.location || "",
    website: formData?.website || "",
  };

  const handleSubmit = async (
    values: BasicInfoFormValues,
    { setSubmitting }: FormikHelpers<BasicInfoFormValues>
  ) => {
    try {
      // Convert industry string back to Industry type
      let industry: Industry | null = null;
      if (values.industry) {
        industry = { [values.industry]: null } as Industry;
      }

      // Update form data with validated values
      if (updateFormData) {
        updateFormData({
          companyName: values.companyName,
          industry,
          companyTagline: values.companyTagline,
          location: values.location,
          website: values.website || undefined, // Convert empty string to undefined
        });
      }

      // Move to next step
      if (nextStep) {
        nextStep();
      }
    } catch (error) {
      console.error("Error submitting basic information:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
      <span className="text-xl text-white">Basic Information</span>
      <span className="text-neutral-500">
        Tell us about your company and what you&apos;re building
      </span>

      <div className="border border-dashed border-neutral-600"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleSubmit: formikHandleSubmit,
          isValid,
          dirty,
        }) => (
          <>
            <div className="flex w-full gap-3">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-white">
                  Company Name <span className="text-red-500">*</span>
                </span>
                <FormInput
                  name="companyName"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-white">
                  Industry <span className="text-red-500">*</span>
                </span>
                <FormSelect name="industry">
                  <option
                    value=""
                    className="bg-neutral-800 text-white px-4"
                    style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                  >
                    Select an industry
                  </option>

                  {/* Technology */}
                  <optgroup
                    label="Technology"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "SoftwareDevelopment",
                        "ArtificialIntelligence",
                        "Blockchain",
                        "Cybersecurity",
                        "CloudComputing",
                        "MobileApps",
                        "WebDevelopment",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Healthcare */}
                  <optgroup
                    label="Healthcare"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "Biotechnology",
                        "MedicalDevices",
                        "DigitalHealth",
                        "Pharmaceuticals",
                        "HealthcareServices",
                        "Telemedicine",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Finance */}
                  <optgroup
                    label="Finance"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "Fintech",
                        "Payments",
                        "Cryptocurrency",
                        "Insurance",
                        "Banking",
                        "InvestmentPlatforms",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Education */}
                  <optgroup
                    label="Education"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "OnlineLearning",
                        "EducationTechnology",
                        "SkillTraining",
                        "LanguageLearning",
                        "CorporateTraining",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Entertainment */}
                  <optgroup
                    label="Entertainment"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "Gaming",
                        "StreamingMedia",
                        "ContentCreation",
                        "SocialMedia",
                        "VirtualReality",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Commerce */}
                  <optgroup
                    label="Commerce"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "ECommerce",
                        "Marketplace",
                        "RetailTechnology",
                        "SupplyChain",
                        "Logistics",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Food & Agriculture */}
                  <optgroup
                    label="Food & Agriculture"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "FoodTechnology",
                        "RestaurantTech",
                        "FoodDelivery",
                        "Agriculture",
                        "NutritionTech",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Transportation */}
                  <optgroup
                    label="Transportation"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "Mobility",
                        "ElectricVehicles",
                        "AutonomousVehicles",
                        "PublicTransport",
                        "DeliveryServices",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Real Estate */}
                  <optgroup
                    label="Real Estate"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "PropertyTechnology",
                        "Construction",
                        "SmartHomes",
                        "RealEstateServices",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Energy */}
                  <optgroup
                    label="Energy & Sustainability"
                    style={{
                      backgroundColor: "#1F2937",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {INDUSTRY_OPTIONS.filter((option) =>
                      [
                        "RenewableEnergy",
                        "EnergyStorage",
                        "SmartGrid",
                        "CleanTech",
                        "Sustainability",
                      ].includes(option.value)
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-800 text-white px-4"
                        style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>

                  {/* Other */}
                  <option
                    value="Other"
                    className="bg-neutral-800 text-white px-4"
                    style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                  >
                    Other
                  </option>
                </FormSelect>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <span className="text-white">
                Company Tagline <span className="text-red-500">*</span>
              </span>
              <FormInput
                name="companyTagline"
                placeholder="A brief description of what you do"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <span className="text-white">
                Location <span className="text-red-500">*</span>
              </span>
              <FormInput name="location" placeholder="City, State/Country" />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <span className="text-white">Website</span>
              <FormInput
                name="website"
                placeholder="https://yourcompany.com"
                type="url"
              />
            </div>

            <div className="border border-dashed border-neutral-600 mt-4 mb-4"></div>

            {/* Form Summary for Development */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 p-3 bg-neutral-900 rounded text-xs">
                <details>
                  <summary className="text-neutral-400 cursor-pointer">
                    Form Debug Info (Development Only)
                  </summary>
                  <div className="mt-2 text-neutral-300">
                    <p>Errors: {JSON.stringify(errors, null, 2)}</p>
                    <p>Touched: {JSON.stringify(touched, null, 2)}</p>
                    <p>Is Valid: {isValid.toString()}</p>
                    <p>Is Dirty: {dirty.toString()}</p>
                    <p>Is Submitting: {isSubmitting.toString()}</p>
                  </div>
                </details>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => formikHandleSubmit()}
                disabled={isSubmitting || !isValid}
                iconRight={<ArrowRight />}
                size="lg"
                className={`text-sm px-4 py-4 mt-4 w-fit transition-all duration-200 ${
                  isSubmitting || !isValid
                    ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
                    : "bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white"
                }`}
              >
                {isSubmitting ? "Validating..." : "Next"}
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
