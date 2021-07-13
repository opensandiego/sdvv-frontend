
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
export function getFormattedCurrency(value: number, decimalDigits?: number): string {

  const notation = value > 9999 ? 'compact' : 'standard';

  const fractionDigits = decimalDigits ? decimalDigits : 0;
  
  // @ts-ignore:
  const formatter = Intl.NumberFormat('en', { notation, style: 'currency', currency: 'USD',  maximumFractionDigits: fractionDigits });

  return formatter.format(value);
}
