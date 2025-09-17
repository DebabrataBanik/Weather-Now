import { useQuery } from "@tanstack/react-query";
import type { Coordinates } from "@/types/weather";
import type { Unit } from "@/context/unit-context";
import { getWeather } from "@/services/get-weather";
import { getLocation } from "@/services/get-location";

const QueryKeys = {
  weatherKeys: (coords: Coordinates, unit: string) => [`weather-${unit}`, coords] as const,
  locationKeys: (coords: Coordinates) => ['location', coords] as const,
};

export function useWeatherQuery(coords: Coordinates | null, unit: Unit){
  return useQuery({
    queryKey: coords ? QueryKeys.weatherKeys(coords, unit) : ['weather'],
    queryFn: () => coords ? getWeather(coords, unit) : Promise.resolve(null),
    enabled: !!coords
  })
}

export function useReverseGeocodeQuery(coords: Coordinates | null){
  return useQuery({
    queryKey: coords ? QueryKeys.locationKeys(coords) : ['location'],
    queryFn: () => coords ? getLocation(coords) : Promise.resolve(null),
    enabled: !!coords
  })
}