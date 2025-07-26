"use client";

import { Formik, Field, ErrorMessage, FormikHelpers, FieldArray } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "@/components/ui/MultiStepForm";

import { ArrowRight, ArrowLeft, Plus, Trash2, Calendar } from "lucide-react";

interface MilestoneFormValues {
  title: string;
  description: string;
  fundingRequired: number;
  completed: boolean;
  targetDate?: string; // Using string for date inputs
  completedDate?: string;
}

interface CompanyDetailsFormValues {
  problem: string;
  solution: string;
  marketOpportunity: string;
  timeline: string;
  milestones: MilestoneFormValues[];
}

// Character limit for timeline
const TIMELINE_CHAR_LIMIT = 50;

// Validation schema
const validationSchema = Yup.object().shape({
  problem: Yup.string()
    .min(50, "Problem statement must be at least 50 characters")
    .max(2000, "Problem statement must be less than 2000 characters")
    .required("Problem statement is required"),

  solution: Yup.string()
    .min(50, "Solution description must be at least 50 characters")
    .max(2000, "Solution description must be less than 2000 characters")
    .required("Solution description is required"),

  marketOpportunity: Yup.string()
    .min(50, "Market opportunity must be at least 50 characters")
    .max(2000, "Market opportunity must be less than 2000 characters")
    .required("Market opportunity is required"),

  timeline: Yup.string()
    .min(2, "Timeline is required")
    .max(
      TIMELINE_CHAR_LIMIT,
      `Timeline must be less than ${TIMELINE_CHAR_LIMIT} characters`
    )
    .required("Timeline is required"),

  milestones: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string()
          .min(3, "Milestone title must be at least 3 characters")
          .max(100, "Milestone title must be less than 100 characters")
          .required("Milestone title is required"),

        description: Yup.string()
          .min(10, "Milestone description must be at least 10 characters")
          .max(500, "Milestone description must be less than 500 characters")
          .required("Milestone description is required"),

        fundingRequired: Yup.number()
          .min(0, "Funding required must be a positive number")
          .max(100000000, "Funding required must be less than $1,000,000")
          .required("Funding required is required"),

        completed: Yup.boolean(),

        targetDate: Yup.string()
          .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Target date must be in YYYY-MM-DD format"
          )
          .optional(),

        completedDate: Yup.string()
          .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Completion date must be in YYYY-MM-DD format"
          )
          .when("completed", {
            is: true,
            then: (schema) => schema.optional(),
            otherwise: (schema) => schema.optional(),
          }),
      })
    )
    .min(1, "At least one milestone is required")
    .max(20, "Maximum 20 milestones allowed"),
});

interface FormTextareaProps {
  name: keyof CompanyDetailsFormValues;
  placeholder: string;
  bgClass?: string;
  showCharCount?: boolean;
  maxLength?: number;
  [key: string]: unknown;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  placeholder,
  bgClass = "bg-neutral-700",
  showCharCount = false,
  maxLength,
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
      <div className="flex flex-col gap-2">
        <Textarea
          {...field}
          {...props}
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
        {showCharCount && maxLength && (
          <div
            className={`text-xs text-right ${
              field.value.length > maxLength - 10
                ? "text-red-400"
                : "text-neutral-400"
            }`}
          >
            {maxLength - field.value.length} characters left
          </div>
        )}
        <ErrorMessage name={name}>
          {(msg: string) => <span className="text-red-400 text-sm">{msg}</span>}
        </ErrorMessage>
      </div>
    )}
  </Field>
);

interface FormInputProps {
  name: string;
  placeholder: string;
  type?: string;
  bgClass?: string;
  [key: string]: unknown;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  type = "text",
  bgClass = "bg-neutral-800 text-white",
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
      <div className="flex flex-col gap-2">
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

export default function CompanyDetails({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}: StepComponentProps) {
  // Helper function to convert Date to string for form input
  const dateToString = (date?: Date) => {
    if (!date) return "";
    return date instanceof Date ? date.toISOString().split("T")[0] : "";
  };

  // Helper function to convert string to Date for form data
  const stringToDate = (dateString?: string) => {
    if (!dateString) return undefined;
    return new Date(dateString);
  };

  // Initial values from form data or defaults
  const initialValues: CompanyDetailsFormValues = {
    problem: formData?.problem || "",
    solution: formData?.solution || "",
    marketOpportunity: formData?.marketOpportunity || "",
    timeline: formData?.timeline || "",
    milestones:
      formData?.milestones && formData.milestones.length > 0
        ? formData.milestones.map((milestone) => ({
            title: milestone.title || "",
            description: milestone.description || "",
            fundingRequired: milestone.fundingRequired || 0,
            completed: milestone.completed || false,
            targetDate: dateToString(milestone.targetDate),
          }))
        : [
            {
              title: "",
              description: "",
              fundingRequired: 0,
              completed: false,
              targetDate: "",
              completedDate: "",
            },
          ],
  };

  const handleSubmit = async (
    values: CompanyDetailsFormValues,
    { setSubmitting }: FormikHelpers<CompanyDetailsFormValues>
  ) => {
    try {
      // Convert form values back to the expected format
      const formattedData = {
        problem: values.problem,
        solution: values.solution,
        marketOpportunity: values.marketOpportunity,
        timeline: values.timeline,
        milestones: values.milestones.map((milestone) => ({
          title: milestone.title,
          description: milestone.description,
          fundingRequired: milestone.fundingRequired,
          completed: milestone.completed,
          targetDate: stringToDate(milestone.targetDate),
          completedDate: stringToDate(milestone.completedDate),
        })),
      };

      // Update form data with validated values
      if (updateFormData) {
        updateFormData(formattedData);
      }

      // Move to next step
      if (nextStep) {
        nextStep();
      }
    } catch (error) {
      console.error("Error submitting company details:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (prevStep) {
      prevStep();
    }
  };

  return (
    <div className="bg-neutral-800 py-4 px-4 flex flex-col gap-2">
      <span className="text-xl text-white">Company Details</span>
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
          values,
        }) => (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-white">
                The Problem <span className="text-red-500">*</span>
              </span>
              <FormTextarea
                name="problem"
                placeholder="What problem are you solving? Why is this important?"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-white">
                Your Solution <span className="text-red-500">*</span>
              </span>
              <FormTextarea
                name="solution"
                placeholder="How does your product/service solve this problem?"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-white">
                Market Opportunity <span className="text-red-500">*</span>
              </span>
              <FormTextarea
                name="marketOpportunity"
                placeholder="Describe your target market and the opportunity size"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-white">
                Timeline <span className="text-red-500">*</span>
              </span>
              <FormTextarea
                name="timeline"
                placeholder="Describe your overall project timeline (max 50 chars)"
                showCharCount={true}
                maxLength={TIMELINE_CHAR_LIMIT}
              />
            </div>

            {/* Milestones Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-lg">
                  Project Milestones <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="bg-neutral-700 p-3 rounded-md mb-3">
                <span className="text-neutral-300 text-sm">
                  Define key project milestones with funding requirements and
                  dates
                </span>
              </div>

              <FieldArray name="milestones">
                {({ push, remove }) => (
                  <>
                    <div className="flex justify-end mb-2">
                      <Button
                        type="button"
                        onClick={() =>
                          push({
                            title: "",
                            description: "",
                            fundingRequired: 0,
                            completed: false,
                            targetDate: "",
                            completedDate: "",
                          })
                        }
                        iconLeft={<Plus size={16} />}
                        size="sm"
                        className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-xs px-2 py-1"
                      >
                        Add Milestone
                      </Button>
                    </div>

                    {values.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="bg-neutral-700/50 p-4 rounded-md mb-2"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-white">
                            Milestone {index + 1}
                          </span>
                          {index > 0 && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              size="sm"
                              variant="ghost"
                              className="text-red-500 p-1 h-auto"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>

                        <div className="flex flex-col gap-3 mb-3">
                          <div className="flex flex-col gap-2">
                            <span className="text-neutral-300 text-sm">
                              Milestone Title{" "}
                              <span className="text-red-500">*</span>
                            </span>
                            <FormInput
                              name={`milestones.${index}.title`}
                              placeholder="e.g., Land Acquisition & Preparation"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-neutral-300 text-sm">
                              Description{" "}
                              <span className="text-red-500">*</span>
                            </span>
                            <Field name={`milestones.${index}.description`}>
                              {({
                                field,
                                meta,
                              }: {
                                field: import("formik").FieldInputProps<string>;
                                meta: import("formik").FieldMetaProps<string>;
                              }) => (
                                <div className="flex flex-col gap-2">
                                  <Textarea
                                    {...field}
                                    placeholder="e.g., Secure 5 hectares of highland terrain and complete soil analysis"
                                    bgClass={`bg-neutral-800 ${
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
                                  <ErrorMessage
                                    name={`milestones.${index}.description`}
                                  >
                                    {(msg: string) => (
                                      <span className="text-red-400 text-sm">
                                        {msg}
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </div>
                              )}
                            </Field>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                              <span className="text-neutral-300 text-sm">
                                Funding Required (USD){" "}
                                <span className="text-red-500">*</span>
                              </span>
                              <FormInput
                                name={`milestones.${index}.fundingRequired`}
                                type="number"
                                placeholder="10000 (e.g. $10,000)"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="text-neutral-300 text-sm">
                                Target Date
                              </span>
                              <div className="flex items-center gap-2">
                                <Calendar
                                  size={16}
                                  className="text-neutral-400"
                                />
                                <FormInput
                                  placeholder="10000 (e.g. $10,000)"
                                  name={`milestones.${index}.targetDate`}
                                  type="date"
                                />
                              </div>
                              <span className="text-xs text-neutral-400 mt-1">
                                Format: YYYY-MM-DD (e.g., 2024-11-01)
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div className="flex flex-col gap-2">
                              <span className="text-neutral-300 text-sm">
                                Status
                              </span>
                              <div className="flex items-center space-x-2">
                                <Field
                                  type="checkbox"
                                  name={`milestones.${index}.completed`}
                                  className="w-4 h-4 text-blue-600 bg-neutral-800 border-neutral-600 rounded focus:ring-blue-500"
                                />
                                <label className="text-white">Completed</label>
                              </div>
                            </div>
                            {milestone.completed && (
                              <div className="flex flex-col gap-2">
                                <span className="text-neutral-300 text-sm">
                                  Completion Date
                                </span>
                                <div className="flex items-center gap-2">
                                  <Calendar
                                    size={16}
                                    className="text-neutral-400"
                                  />
                                  <FormInput
                                    placeholder="10000 (e.g. $10,000)"
                                    name={`milestones.${index}.completedDate`}
                                    type="date"
                                  />
                                </div>
                                <span className="text-xs text-neutral-400 mt-1">
                                  Format: YYYY-MM-DD (e.g., 2024-08-01)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Show milestone errors */}
                    <ErrorMessage name="milestones">
                      {(msg) => {
                        // Handle both string and object error messages
                        const errorText =
                          typeof msg === "string"
                            ? msg
                            : "Please check milestone information";
                        return (
                          <span className="text-red-400 text-sm">
                            {errorText}
                          </span>
                        );
                      }}
                    </ErrorMessage>
                  </>
                )}
              </FieldArray>
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
                    <p>Milestones Count: {values.milestones.length}</p>
                  </div>
                </details>
              </div>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={handlePrevious}
                iconLeft={<ArrowLeft />}
                size="lg"
                className="bg-neutral-500 text-white hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
              >
                Previous
              </Button>
              <Button
                type="button"
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
