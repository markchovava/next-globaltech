export function formatNumber(num: number) {
  return num.toLocaleString('en-US');
}


export const listNumbers = (limit: number): number[] => {
  let a: number[] = []
  for (let i = 1; i <= limit; i++) {
    a = [...a, i]
  }
  return a
};

export const formatPrice = (value: number | string): string => {
  // Convert string to number if necessary
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Handle invalid inputs gracefully
  if (isNaN(num)) return '0.00';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};


export const formatToTwoDecimals = (value: number | string): string => {
  // Ensure the input is treated as a number
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Check if the input is a valid number
  if (isNaN(num)) return "0.00";

  return num.toFixed(2);
};