export interface Coordinates{
  lat: number;
  lon: number;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    apparent_temperature: string;
    weather_code: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    precipitation: string;
  };

  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
  };

  hourly_units: {
    time: string;
    weather_code: string;
    temperature_2m: string;
    apparent_temperature: string;
    precipitation: string;
    relative_humidity_2m: string;
  };

  hourly: {
    time: string[];
    weather_code: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
    relative_humidity_2m: number[];
  };

  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_min: string;
    temperature_2m_max: string;
    precipitation_sum: string;
    relative_humidity_2m_mean: string;
  };

  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    precipitation_sum: number[];
    relative_humidity_2m_mean: number[];
  };
}
export interface ReverseGeocodeResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name?: string;
  display_name: string;
  address: Address;
  boundingbox: [string, string, string, string];
}

export interface Address{
  amenity?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  county?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country: string;
  country_code: string;
  [key: string]: string | undefined;
}

export interface WeatherCodeInfo{
  description: string;
  icon: string;
}

export interface HourlyData{
  time: string;
  temp: number;
  code: number;
}

export interface DaysOption{
  value: string;
  label: string;
}

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface GeocodingResponse {
  results?: LocationResult[];
  generationtime_ms?: number;
}

export interface NewLocationData{
  lat: number;
  lon: number;
  name: string;
}