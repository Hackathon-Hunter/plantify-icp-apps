// Utility functions for handling union types

/**
 * Extracts the variant name from a union type object
 * Example: { Active: null } -> "Active"
 */
export const getUnionVariant = (unionObject: Record<string, unknown>): string => {
  return Object.keys(unionObject)[0] || '';
};

/**
 * Extracts the value from a union type object  
 * Example: { Other: "Custom Crop" } -> "Custom Crop"
 */
export const getUnionValue = (unionObject: Record<string, unknown>): unknown => {
  const key = Object.keys(unionObject)[0];
  return key ? unionObject[key] : null;
};

/**
 * Helper to get crop type string from CropType union
 */
export const getCropTypeString = (cropType: Record<string, unknown>): string => {
  const variant = getUnionVariant(cropType);
  if (variant === 'Other') {
    return getUnionValue(cropType) as string;
  }
  return variant;
};

/**
 * Helper to get status string from any status union type
 */
export const getStatusString = (status: Record<string, unknown>): string => {
  return getUnionVariant(status);
}; 