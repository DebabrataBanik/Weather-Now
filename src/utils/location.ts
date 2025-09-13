import type { Address } from "@/types/weather";

export function formatLocation(address: Address): string {
  const city =
    address?.city ||
    address?.town ||
    address?.village ||
    address?.hamlet ||
    address?.suburb ||
    address?.neighbourhood ||
    "";

  const state =
    address?.state ||
    address?.state_district ||
    address?.county ||
    "";

  const country = address.country;

  const parts = [city, state, country].filter(Boolean);
  if (city && state && city.toLowerCase() === state.toLowerCase()) {
    parts.splice(1, 1);
  }

  return parts.join(", ");
}
