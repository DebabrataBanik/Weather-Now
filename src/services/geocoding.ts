import type { GeocodingResponse } from "@/types/weather";

export async function getSearchLocation(name: string): Promise<GeocodingResponse> {
  const params = new URLSearchParams({
    name,
    count: "5",
    language: 'en'
  })

  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`)
  if(!res.ok){
    throw new Error(`Weather API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}