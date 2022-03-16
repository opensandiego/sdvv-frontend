
export function getCompactFormattedCurrency(value: number, decimalDigits?: number): string {

  const fractionDigits = decimalDigits ? decimalDigits : 0;

  // @ts-ignore:
  const formatter = Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD',  maximumFractionDigits: fractionDigits });

  return formatter.format(value);
}

/**
 * Formats number as a currency and uses compact format (for example: 10K) only 
 * when value is greater than 9999.
 */
export function getFormattedCurrency(value: number, maxDecimalDigits: number = 0): string {
  const limit = 9999;
  const isCompact = value > limit;

  const notation = isCompact ? 'compact' : 'standard';
  const fractionDigits = isCompact ? maxDecimalDigits : 0;

  // @ts-ignore:
  const formatter = Intl.NumberFormat('en', { notation, style: 'currency', currency: 'USD',  maximumFractionDigits: fractionDigits });

  return formatter.format(value);
}
