/**
 * Convert ICP nanosecond timestamp to JavaScript Date
 * ICP timestamps are in nanoseconds since Unix epoch
 * JavaScript Date expects milliseconds since Unix epoch
 */
export const icpTimestampToDate = (timestamp: bigint): Date => {
  // Convert nanoseconds to milliseconds by dividing by 1,000,000
  const milliseconds = Number(timestamp) / 1_000_000;
  return new Date(milliseconds);
};

/**
 * Calculate days since an ICP timestamp
 */
export const getDaysSinceIcpTimestamp = (timestamp: bigint): number => {
  const date = icpTimestampToDate(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Format ICP timestamp to human readable date string
 */
export const formatIcpTimestamp = (
  timestamp: bigint,
  options?: Intl.DateTimeFormatOptions
): string => {
  const date = icpTimestampToDate(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
};

/**
 * Format ICP timestamp to human readable date and time string
 */
export const formatIcpTimestampWithTime = (timestamp: bigint): string => {
  const date = icpTimestampToDate(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get relative time string (e.g., "2 days ago", "1 week ago")
 */
export const getRelativeTimeFromIcpTimestamp = (timestamp: bigint): string => {
  const date = icpTimestampToDate(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // If in the future, return "just now"
  if (diffMs < 0) {
    return "just now";
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  } else if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else if (diffWeeks > 0) {
    return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

// Example usage in your components:

// For ActivityFeed component:
export const formatActivityDate = (timestamp: bigint) => {
  return formatIcpTimestampWithTime(timestamp);
};

// For SubmitForReview component:
export const getDaysAgo = (timestamp: bigint) => {
  return getDaysSinceIcpTimestamp(timestamp);
};

// Convert ICP e8s amounts to display currency
export const formatIcpAmount = (
  amount: bigint,
  decimals: number = 2
): string => {
  const icpAmount = Number(amount) / 100_000_000; // Convert from e8s to ICP
  return icpAmount.toFixed(decimals);
};

// Convert ICP e8s amounts to USD (assuming 1 ICP = 1 USD for now)
export const formatUsdAmount = (
  amount: bigint,
  decimals: number = 2
): string => {
  const usdAmount = Number(amount) / 100_000_000; // Convert from e8s to USD
  return usdAmount.toFixed(decimals);
};
