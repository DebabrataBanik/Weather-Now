import type { Coordinates, WeatherResponse } from "../types/weather";

export async function getWeather({ lat, lon }: Coordinates): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m,precipitation",
    hourly: "weather_code,temperature_2m,apparent_temperature,precipitation,relative_humidity_2m",
    daily: "weather_code,temperature_2m_min,temperature_2m_max,precipitation_sum,relative_humidity_2m_mean",
    timezone: "auto",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Weather API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}