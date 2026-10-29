/**
 * Base site URL configured from environment variable with fallback to production domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://discount-calculator-neon.vercel.app";
