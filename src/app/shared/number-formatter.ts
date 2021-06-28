
export function getCompactFormattedCurrency(value: number, decimalDigits?: number): string {

  const fractionDigits = decimalDigits ? decimalDigits : 0;

  // @ts-ignore:
  const formatter = Intl.NumberFormat('en', { notation: 'compact',style: 'currency', currency: 'USD',  maximumFractionDigits: fractionDigits });

  return formatter.format(value);
}
