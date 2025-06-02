import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to locale string
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Format time to 12-hour format
export function formatTime(time: string): string {
  return time;
}

// Calculate pension estimate
export function calculatePensionEstimate(
  age: number,
  salary: number,
  contributionPercentage: number,
  retirementAge: number
): number {
  // This is a simple estimation formula
  // In a real-world scenario, this would be much more complex with interest rates, inflation, etc.
  const yearsToRetirement = retirementAge - age;
  const annualContribution = salary * (contributionPercentage / 100);
  const totalContribution = annualContribution * yearsToRetirement;
  
  // Assume 6% average annual return
  const estimatedValue = totalContribution * Math.pow(1.06, yearsToRetirement);
  
  // Assume 20-year payout period in retirement
  const monthlyPension = estimatedValue / (20 * 12);
  
  return Math.round(monthlyPension);
}

// Calculate additional Tier 3 benefit
export function calculateTier3Benefit(
  salary: number,
  additionalPercentage: number,
  yearsToRetirement: number
): number {
  const annualContribution = salary * (additionalPercentage / 100);
  const totalContribution = annualContribution * yearsToRetirement;
  
  // Assume 7% average annual return for Tier 3 (slightly higher than mandatory pension)
  const estimatedValue = totalContribution * Math.pow(1.07, yearsToRetirement);
  
  // Assume 20-year payout period in retirement
  const monthlyAdditionalPension = estimatedValue / (20 * 12);
  
  return Math.round(monthlyAdditionalPension);
}

// Format currency to Ghana Cedis
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}