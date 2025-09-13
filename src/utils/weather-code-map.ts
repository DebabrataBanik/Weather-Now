import type { WeatherCodeInfo } from "@/types/weather";

import drizzleIcon from '@/assets/images/icon-drizzle.webp';
import fogIcon from '@/assets/images/icon-fog.webp'
import overcastIcon from '@/assets/images/icon-overcast.webp'
import partlyCloudyIcon from '@/assets/images/icon-partly-cloudy.webp'
import rainIcon from '@/assets/images/icon-rain.webp'
import snowIcon from '@/assets/images/icon-snow.webp'
import stormIcon from '@/assets/images/icon-storm.webp'
import sunnyIcon from '@/assets/images/icon-sunny.webp'

export const weatherCodeMap: Record<number, WeatherCodeInfo> = {
  // Clear / Sunny
  0: { description: "Clear sky", icon: sunnyIcon },

  // Mainly clear, partly cloudy, overcast
  1: { description: "Mainly clear", icon: sunnyIcon },
  2: { description: "Partly cloudy", icon: partlyCloudyIcon },
  3: { description: "Overcast", icon: overcastIcon },

  // Fog, mist
  45: { description: "Fog", icon: fogIcon },
  48: { description: "Depositing rime fog", icon: fogIcon },

  // Drizzle
  51: { description: "Light drizzle", icon: drizzleIcon },
  53: { description: "Moderate drizzle", icon: drizzleIcon },
  55: { description: "Dense drizzle", icon: drizzleIcon },
  56: { description: "Light freezing drizzle", icon: drizzleIcon },
  57: { description: "Dense freezing drizzle", icon: drizzleIcon },

  // Rain
  61: { description: "Slight rain", icon: rainIcon },
  63: { description: "Moderate rain", icon: rainIcon },
  65: { description: "Heavy rain", icon: rainIcon },
  66: { description: "Light freezing rain", icon: rainIcon },
  67: { description: "Heavy freezing rain", icon: rainIcon },

  // Snow
  71: { description: "Slight snow fall", icon: snowIcon },
  73: { description: "Moderate snow fall", icon: snowIcon },
  75: { description: "Heavy snow fall", icon: snowIcon },
  77: { description: "Snow grains", icon: snowIcon },

  // Showers
  80: { description: "Slight rain showers", icon: rainIcon },
  81: { description: "Moderate rain showers", icon: rainIcon },
  82: { description: "Violent rain showers", icon: stormIcon },

  85: { description: "Slight snow showers", icon: snowIcon },
  86: { description: "Heavy snow showers", icon: snowIcon },

  // Thunderstorm
  95: { description: "Thunderstorm", icon: stormIcon },
  96: { description: "Thunderstorm with slight hail", icon: stormIcon },
  99: { description: "Thunderstorm with heavy hail", icon: stormIcon },
}

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return (
    weatherCodeMap[code] || {
      description: "Unknown",
      icon: sunnyIcon,
    }
  );
}