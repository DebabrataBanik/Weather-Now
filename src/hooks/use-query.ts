import { useQuery } from "@tanstack/react-query";
import type { Coordinates } from "../types/weather";
import { getWeather } from "../services/get-weather";

const QueryKeys = {
  weatherKeys: (coords: Coordinates) => ['weather', coords] as const
};

export function useWeatherQuery(coords: Coordinates | null){
  return useQuery({
    queryKey: coords ? QueryKeys.weatherKeys(coords) : ['weather'],
    queryFn: () => coords ? getWeather(coords) : Promise.resolve(null),
    enabled: !!coords
  })
}