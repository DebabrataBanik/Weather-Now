import { format } from 'date-fns';
import type { HourlyData } from '@/types/weather';
import type { WeatherResponse } from '@/types/weather';


export const getHourlyData = (hourly: WeatherResponse['hourly'], selectedDay: string): HourlyData[] => {

  const {time, temperature_2m, weather_code} = hourly;

  const hourlyData = time.map((item, index) => (
    {
      time: item,
      temp: temperature_2m[index],
      code: weather_code[index]
    }
  )).filter(item => (
    format(item.time, 'yyyy-MM-dd') === selectedDay
  ))

  return hourlyData;
}