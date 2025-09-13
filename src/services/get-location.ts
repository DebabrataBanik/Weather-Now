import type { Coordinates, ReverseGeocodeResponse } from "../types/weather";

export async function getLocation({lat,lon}: Coordinates): Promise<ReverseGeocodeResponse>{
  
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=en`;
  const res = await fetch(url, { headers: {"User-Agent":'my-weather-app'}});

  if(!res.ok) throw new Error(`Failed to fetch location. API Error: ${res.status} ${res.statusText}`)
  
  return res.json();
}