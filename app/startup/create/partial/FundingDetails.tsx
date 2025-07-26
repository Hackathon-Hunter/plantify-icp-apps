"use client";

import { Formik, Field, ErrorMessage, FormikHelpers, FieldArray } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { StepComponentProps } from "@/components/ui/MultiStepForm";

import { ArrowRight, ArrowLeft, ChevronDown, Plus, Trash2 } from "lucide-react";

interface UseOfFundsFormValues {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

interface FundingDetailsFormValues {
  fundingGoal: number;
  minimumFunding: number;
  companyValuation: number;
  minInvestment: number;
  expectedROI: string;
  riskLevel: string;
  useOfFunds: UseOfFundsFormValues[];
}

// Validation schema
const validationSchema = Yup.object().shape({
  fundingGoal: Yup.number()
    .min(5000, "Funding goal must be at least $5,000")
    .max(5000000, "Funding goal must be less than $5,000,000")
    .required("Funding goal is required"),

  minimumFunding: Yup.number()
    .min(1000, "Minimum funding must be at least $1,000")
    .test(
      "min-funding-check",
      "Minimum funding cannot exceed funding goal",
      function (value) {
        const { fundingGoal } = this.parent;
        if (!value || !fundingGoal) return true;
        return value <= fundingGoal;
      }
    )
    .test(
      "min-funding-percentage",
      "Minimum funding should not exceed 80% of funding goal",
      function (value) {
        const { fundingGoal } = this.parent;
        if (!value || !fundingGoal) return true;
        return value <= fundingGoal * 0.8;
      }
    )
    .required("Minimum funding is required"),

  companyValuation: Yup.number()
    .min(1000, "Company valuation must be at least $1,000")
    .max(1000000000, "Company valuation must be less than $1,000,000,000")
    .test(
      "valuation-check",
      "Company valuation must be greater than funding goal",
      function (value) {
        const { fundingGoal } = this.parent;
        if (!value || !fundingGoal) return true;
        return value > fundingGoal;
      }
    )
    .required("Company valuation is required"),

  minInvestment: Yup.number()
    .min(100, "Minimum investment must be at least $100")
    .test(
      "min-investment-check",
      "Minimum investment cannot exceed funding goal",
      function (value) {
        const { fundingGoal } = this.parent;
        if (!value || !fundingGoal) return true;
        return value <= fundingGoal;
      }
    )
    .test(
      "min-investment-percentage",
      "Minimum investment should not exceed 10% of funding goal",
      function (value) {
        const { fundingGoal } = this.parent;
        if (!value || !fundingGoal) return true;
        return value <= fundingGoal * 0.1;
      }
    )
    .required("Minimum investment is required"),

  expectedROI: Yup.string()
    .min(1, "Expected ROI is required")
    .max(50, "Expected ROI must be less than 50 characters")
    .required("Expected ROI is required"),

  riskLevel: Yup.string()
    .oneOf(["Low", "Medium", "High"], "Please select a valid risk level")
    .required("Risk level is required"),

  useOfFunds: Yup.array()
    .of(
      Yup.object().shape({
        category: Yup.string()
          .min(2, "Category name must be at least 2 characters")
          .max(50, "Category name must be less than 50 characters")
          .required("Category name is required"),

        amount: Yup.number()
          .min(0, "Amount must be a positive number")
          .required("Amount is required"),

        percentage: Yup.number()
          .min(0, "Percentage must be between 0 and 100")
          .max(100, "Percentage must be between 0 and 100")
          .required("Percentage is required"),

        description: Yup.string()
          .min(5, "Description must be at least 5 characters")
          .max(200, "Description must be less than 200 characters")
          .required("Description is required"),
      })
    )
    .min(1, "At least one use of funds category is required")
    .max(15, "Maximum 15 use of funds categories allowed")
    .test(
      "total-percentage",
      "Total percentage should be approximately 100%",
      function (useOfFunds) {
        if (!useOfFunds || useOfFunds.length === 0) return true;

        const totalPercentage = useOfFunds.reduce(
          (sum, fund) => sum + (fund.percentage || 0),
          0
        );
        return totalPercentage >= 95 && totalPercentage <= 105; // Allow 5% buffer
      }
    )
    .test(
      "total-amount",
      "Total amount should not exceed funding goal",
      function (useOfFunds) {
        const { fundingGoal } = this.parent;
        if (!useOfFunds || useOfFunds.length === 0 || !fundingGoal) return true;

        const totalAmount = useOfFunds.reduce(
          (sum, fund) => sum + (fund.amount || 0),
          0
        );
        return totalAmount <= fundingGoal * 1.1; // Allow 10% buffer
      }
    ),
});

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
  name: string;
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

export default function FundingDetails({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}: StepComponentProps) {
  // Initial values from form data or defaults
  const initialValues: FundingDetailsFormValues = {
    fundingGoal: formData?.fundingGoal || 0,
    minimumFunding: formData?.minimumFunding || 0,
    companyValuation: formData?.companyValuation || 0,
    minInvestment: formData?.minInvestment || 0,
    expectedROI: formData?.expectedROI || "",
    riskLevel: formData?.riskLevel || "Medium",
    useOfFunds:
      formData?.useOfFunds && formData.useOfFunds.length > 0
        ? formData.useOfFunds
        : [{ category: "", amount: 0, percentage: 0, description: "" }],
  };

  // Auto-calculate percentage when amount or funding goal changes
  const calculatePercentage = (amount: number, fundingGoal: number): number => {
    if (fundingGoal <= 0 || amount <= 0) return 0;
    return parseFloat(((amount / fundingGoal) * 100).toFixed(2));
  };

  const handleSubmit = async (
    values: FundingDetailsFormValues,
    { setSubmitting }: FormikHelpers<FundingDetailsFormValues>
  ) => {
    try {
      // Update form data with validated values
      if (updateFormData) {
        updateFormData(values);
      }

      // Move to next step
      if (nextStep) {
        nextStep();
      }
    } catch (error) {
      console.error("Error submitting funding details:", error);
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
      <span className="text-xl text-white">Funding Details</span>
      <span className="text-neutral-500">Set your funding goals and terms</span>

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
          setFieldValue,
        }) => (
          <>
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-white">
                  Funding Goal (USD) <span className="text-red-500">*</span>
                </span>
                <FormInput
                  name="fundingGoal"
                  type="number"
                  placeholder="150000"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-white">
                  Minimum Funding (USD) <span className="text-red-500">*</span>
                </span>
                <FormInput
                  name="minimumFunding"
                  type="number"
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-white">
                  Company Valuation (USD){" "}
                  <span className="text-red-500">*</span>
                </span>
                <FormInput
                  name="companyValuation"
                  type="number"
                  placeholder="1500000"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-white">
                  Minimum Investment (USD){" "}
                  <span className="text-red-500">*</span>
                </span>
                <FormInput
                  name="minInvestment"
                  type="number"
                  placeholder="1000"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-white">
                Expected ROI <span className="text-red-500">*</span>
              </span>
              <FormInput
                name="expectedROI"
                placeholder="e.g., 15-20% annually"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <span className="text-white">
                Risk Level <span className="text-red-500">*</span>
              </span>
              <FormSelect name="riskLevel">
                <option
                  value="Low"
                  className="bg-neutral-800 text-white px-4"
                  style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                >
                  Low
                </option>
                <option
                  value="Medium"
                  className="bg-neutral-800 text-white px-4"
                  style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                >
                  Medium
                </option>
                <option
                  value="High"
                  className="bg-neutral-800 text-white px-4"
                  style={{ backgroundColor: "#1F2937", color: "#FFFFFF" }}
                >
                  High
                </option>
              </FormSelect>
            </div>

            {/* Use of Funds Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-lg">
                  Use of Funds <span className="text-red-500">*</span>
                </span>
              </div>
              <div className="bg-neutral-700 p-3 rounded-md mb-3">
                <span className="text-neutral-300 text-sm">
                  Break down how you will use the raised funds by category
                </span>
              </div>

              <FieldArray name="useOfFunds">
                {({ push, remove }) => (
                  <>
                    <div className="flex justify-end mb-2">
                      <Button
                        type="button"
                        onClick={() =>
                          push({
                            category: "",
                            amount: 0,
                            percentage: 0,
                            description: "",
                          })
                        }
                        iconLeft={<Plus size={16} />}
                        size="sm"
                        className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-xs px-2 py-1"
                      >
                        Add Category
                      </Button>
                    </div>

                    {values.useOfFunds.map((fund, index) => (
                      <div
                        key={index}
                        className="bg-neutral-700/50 p-4 rounded-md mb-2"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-white">
                            Category {index + 1}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="flex flex-col gap-2">
                            <span className="text-neutral-300 text-sm">
                              Category Name
                            </span>
                            <FormInput
                              name={`useOfFunds.${index}.category`}
                              placeholder="e.g., Marketing, Development"
                              bgClass="bg-neutral-800 text-white"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-neutral-300 text-sm">
                              Amount (USD)
                            </span>
                            <Field name={`useOfFunds.${index}.amount`}>
                              {({
                                field,
                                meta,
                              }: {
                                field: import("formik").FieldInputProps<number>;
                                meta: import("formik").FieldMetaProps<number>;
                              }) => (
                                <div className="flex flex-col gap-2">
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="25000"
                                    bgClass={`bg-neutral-800 text-white ${
                                      meta.touched && meta.error
                                        ? "border border-red-500 focus:border-red-500"
                                        : "border border-neutral-600 focus:border-white"
                                    }`}
                                    onChange={(e) => {
                                      const amount =
                                        parseFloat(e.target.value) || 0;
                                      setFieldValue(
                                        `useOfFunds.${index}.amount`,
                                        amount
                                      );

                                      // Auto-calculate percentage
                                      if (values.fundingGoal > 0) {
                                        const percentage = calculatePercentage(
                                          amount,
                                          values.fundingGoal
                                        );
                                        setFieldValue(
                                          `useOfFunds.${index}.percentage`,
                                          percentage
                                        );
                                      }
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`useOfFunds.${index}.amount`}
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-2">
                            <span className="text-neutral-300 text-sm">
                              Percentage
                            </span>
                            <div className="flex items-center">
                              <FormInput
                                name={`useOfFunds.${index}.percentage`}
                                type="number"
                                placeholder="25"
                                min="0"
                                max="100"
                                step="0.01"
                                bgClass="bg-neutral-800 text-white"
                              />
                              <span className="ml-2 text-white">%</span>
                            </div>
                            <span className="text-xs text-neutral-400 mt-1">
                              {values.fundingGoal > 0
                                ? "Auto-calculated from amount"
                                : "Enter funding goal to auto-calculate"}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-neutral-300 text-sm">
                              Description
                            </span>
                            <Field name={`useOfFunds.${index}.description`}>
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
                                    placeholder="Brief description of how these funds will be used"
                                    bgClass={`bg-neutral-800 ${
                                      meta.touched && meta.error
                                        ? "border border-red-500 focus:border-red-500"
                                        : "border border-neutral-600 focus:border-white"
                                    }`}
                                  />
                                  <ErrorMessage
                                    name={`useOfFunds.${index}.description`}
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
                        </div>
                      </div>
                    ))}

                    {/* Use of Funds validation summary */}
                    <div className="bg-neutral-700 p-3 rounded-md mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-300">Total Amount:</span>
                        <span className="text-white">
                          $
                          {values.useOfFunds
                            .reduce((sum, fund) => sum + (fund.amount || 0), 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-300">
                          Total Percentage:
                        </span>
                        <span
                          className={`${
                            values.useOfFunds.reduce(
                              (sum, fund) => sum + (fund.percentage || 0),
                              0
                            ) > 105 ||
                            values.useOfFunds.reduce(
                              (sum, fund) => sum + (fund.percentage || 0),
                              0
                            ) < 95
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {values.useOfFunds
                            .reduce(
                              (sum, fund) => sum + (fund.percentage || 0),
                              0
                            )
                            .toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>

                    {/* Show use of funds errors */}
                    <ErrorMessage name="useOfFunds">
                      {(msg) => {
                        const errorText =
                          typeof msg === "string"
                            ? msg
                            : "Please check use of funds information";
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
                    <p>Use of Funds Count: {values.useOfFunds.length}</p>
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
