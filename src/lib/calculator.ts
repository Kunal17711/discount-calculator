import { SITE_URL } from "./site";

/**
 * Format a number into Indian style currency string (e.g. ₹1,00,000 or ₹450.50).
 */
export function formatIndianCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "₹0";
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  // Split into whole and decimal parts
  const isWhole = Number.isInteger(absAmount);
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(absAmount);

  return `${isNegative ? "-" : ""}₹${formattedNumber}`;
}

/**
 * Format percentage nicely (e.g. 50% or 33.33%).
 */
export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "0%";
  }
  const cleanVal = Math.round(value * 100) / 100;
  if (Number.isInteger(cleanVal)) {
    return `${cleanVal}%`;
  }
  return `${cleanVal.toFixed(2)}%`;
}

/**
 * Sanitize and validate numeric input string.
 * Ensures non-negative numbers and caps discount percentages at 100.
 */
export function sanitizeNumberInput(
  raw: string,
  max: number = Infinity
): { value: number; str: string } {
  // Remove non-numeric characters except single decimal point
  const cleaned = raw.replace(/[^0-9.]/g, "");
  
  // Ensure only one decimal point
  const parts = cleaned.split(".");
  const sanitizedStr = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;

  if (sanitizedStr === "" || sanitizedStr === ".") {
    return { value: 0, str: sanitizedStr };
  }

  const parsed = parseFloat(sanitizedStr);
  if (isNaN(parsed) || parsed < 0) {
    return { value: 0, str: "0" };
  }

  if (parsed > max) {
    return { value: max, str: max.toString() };
  }

  return { value: parsed, str: sanitizedStr };
}

export interface DiscountCalculationResult {
  originalPrice: number;
  discountPercent: number;
  extraDiscountPercent: number;
  priceAfterFirst: number;
  firstDiscountAmount: number;
  extraDiscountAmount: number;
  finalPrice: number;
  youSave: number;
  effectiveDiscountPercent: number;
  calculationSteps: string[];
  summaryCopyText: string;
}

export function calculateDiscount(
  originalPrice: number,
  discountPercent: number,
  extraDiscountPercent: number = 0
): DiscountCalculationResult {
  const p = Math.max(0, originalPrice);
  const d1 = Math.min(100, Math.max(0, discountPercent));
  const d2 = Math.min(100, Math.max(0, extraDiscountPercent));

  // Step 1: First discount
  const firstDiscountAmount = p * (d1 / 100);
  const priceAfterFirst = Math.max(0, p - firstDiscountAmount);

  // Step 2: Extra discount on already discounted price
  const extraDiscountAmount = priceAfterFirst * (d2 / 100);
  const finalPrice = Math.max(0, priceAfterFirst - extraDiscountAmount);

  // Overall savings
  const youSave = Math.max(0, p - finalPrice);

  // Effective Total Discount %
  // Formula: 1 - (1 - d1/100) * (1 - d2/100)
  const effectiveRatio = 1 - (1 - d1 / 100) * (1 - d2 / 100);
  const effectiveDiscountPercent = Math.min(100, Math.max(0, effectiveRatio * 100));

  // Build step-by-step calculation explanation
  const calculationSteps: string[] = [];
  if (p === 0 && d1 === 0 && d2 === 0) {
    calculationSteps.push("Enter original price and discount % to see breakdown.");
  } else if (d2 > 0) {
    calculationSteps.push(
      `1. First discount (${formatPercent(d1)}) on ${formatIndianCurrency(p)} saves ${formatIndianCurrency(firstDiscountAmount)} → Price becomes ${formatIndianCurrency(priceAfterFirst)}.`
    );
    calculationSteps.push(
      `2. Extra discount (${formatPercent(d2)}) applied on ${formatIndianCurrency(priceAfterFirst)} saves an additional ${formatIndianCurrency(extraDiscountAmount)} → Final Price: ${formatIndianCurrency(finalPrice)}.`
    );
    calculationSteps.push(
      `Total savings: ${formatIndianCurrency(youSave)} (Effective total discount: ${formatPercent(effectiveDiscountPercent)}).`
    );
  } else {
    calculationSteps.push(
      `A ${formatPercent(d1)} discount on ${formatIndianCurrency(p)} saves ${formatIndianCurrency(youSave)}, resulting in a final price of ${formatIndianCurrency(finalPrice)}.`
    );
  }

  // Summary text for copy button
  const summaryCopyText = d2 > 0
    ? `🏷️ Discount Breakdown:
Original Price: ${formatIndianCurrency(p)}
Discounts: ${formatPercent(d1)} + ${formatPercent(d2)} extra
Final Price: ${formatIndianCurrency(finalPrice)}
You Save: ${formatIndianCurrency(youSave)} (${formatPercent(effectiveDiscountPercent)} total off)
Calculated via Discount Calculator (${SITE_URL})`
    : `🏷️ Discount Breakdown:
Original Price: ${formatIndianCurrency(p)}
Discount: ${formatPercent(d1)}
Final Price: ${formatIndianCurrency(finalPrice)}
You Save: ${formatIndianCurrency(youSave)} (${formatPercent(effectiveDiscountPercent)} off)
Calculated via Discount Calculator (${SITE_URL})`;

  return {
    originalPrice: p,
    discountPercent: d1,
    extraDiscountPercent: d2,
    priceAfterFirst,
    firstDiscountAmount,
    extraDiscountAmount,
    finalPrice,
    youSave,
    effectiveDiscountPercent,
    calculationSteps,
    summaryCopyText,
  };
}

export interface ReverseDiscountResult {
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  youSave: number;
  isPriceIncrease: boolean;
  priceDifference: number;
  percentageChange: number;
  calculationSteps: string[];
  summaryCopyText: string;
}

export function calculateReverseDiscount(
  originalPrice: number,
  salePrice: number
): ReverseDiscountResult {
  const p = Math.max(0, originalPrice);
  const s = Math.max(0, salePrice);

  const priceDifference = p - s;
  const isPriceIncrease = s > p && p > 0;

  let percentageChange = 0;
  if (p > 0) {
    percentageChange = Math.abs((priceDifference / p) * 100);
  }

  const discountPercent = !isPriceIncrease && p > 0 ? percentageChange : 0;
  const youSave = !isPriceIncrease ? Math.max(0, priceDifference) : 0;

  const calculationSteps: string[] = [];
  if (p === 0 && s === 0) {
    calculationSteps.push("Enter original price and sale price to calculate the discount percentage.");
  } else if (isPriceIncrease) {
    calculationSteps.push(
      `Sale price (${formatIndianCurrency(s)}) is higher than original price (${formatIndianCurrency(p)}). Price increased by +${formatPercent(percentageChange)} (+${formatIndianCurrency(s - p)}).`
    );
  } else if (p > 0) {
    calculationSteps.push(
      `Price reduced from ${formatIndianCurrency(p)} to ${formatIndianCurrency(s)}. You save ${formatIndianCurrency(youSave)}, which equals a ${formatPercent(discountPercent)} discount.`
    );
  }

  const summaryCopyText = isPriceIncrease
    ? `📈 Price Increase Summary:
Original Price: ${formatIndianCurrency(p)}
New Price: ${formatIndianCurrency(s)}
Price Increase: +${formatPercent(percentageChange)} (+${formatIndianCurrency(s - p)})`
    : `🏷️ Discount Summary:
Original Price: ${formatIndianCurrency(p)}
Sale Price: ${formatIndianCurrency(s)}
Discount: ${formatPercent(discountPercent)}
You Save: ${formatIndianCurrency(youSave)}
Calculated via Discount Calculator (${SITE_URL})`;

  return {
    originalPrice: p,
    salePrice: s,
    discountPercent,
    youSave,
    isPriceIncrease,
    priceDifference,
    percentageChange,
    calculationSteps,
    summaryCopyText,
  };
}
