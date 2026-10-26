import type { SupportedCurrency } from "@marketing/types/currency";

export const PRO_PLAN_COST_MONTHLY = 29;
export const PRO_PLAN_COST_YEARLY = 27;
export const BUSINESS_PLAN_COST_MONTHLY = 45;

export const CP_PRO_SEAT_COST_MONTHLY = 30;
export const CP_PRO_SEAT_COST_YEARLY = 24;
export const CP_MAX_SEAT_COST_MONTHLY = 150;
export const CP_MAX_SEAT_COST_YEARLY = 120;

export function formatPriceWithCurrency(
  price: number,
  currency: SupportedCurrency
): string {
  return currency === "usd" ? `$${price}` : `${price}€`;
}

/**
 * @cc [owner:saharshbaweja,label:product] aeros-prices-always-usd
 * Public Aeros pricing must use USD regardless of location or loading state.
 */
export function useUserBillingCurrency(): SupportedCurrency {
  return "usd";
}

export function usePriceWithCurrency(price: number): string {
  const currency = useUserBillingCurrency();
  return formatPriceWithCurrency(price, currency);
}
