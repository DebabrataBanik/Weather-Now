import type { WeatherResponse } from "@/types/weather"
import type { Address } from '@/types/weather.ts'
import { format } from 'date-fns'
import { getWeatherInfo } from "@/utils/weather-code-map"

interface WeatherResponseProps{
  data: WeatherResponse;
  location?: Address;
}

interface WeatherInfo{
  title: string;
  value: string;
}

const CurrentWeatherData = ({data, location}: WeatherResponseProps) => {

  const { temperature_2m, apparent_temperature, precipitation, relative_humidity_2m, weather_code, wind_speed_10m } = data.current;

  const {description, icon} = getWeatherInfo(weather_code)

  const weatherInfo: WeatherInfo[]  = [
    
    {
      title: 'Feels Like',
      value: `${Math.floor(apparent_temperature)}°`
    },
    {
      title: 'Humidity', 
      value: `${relative_humidity_2m}%`
    },
    {
      title: 'Wind',
      value: `${wind_speed_10m} km/h`
    },
    {
      title: 'Precipitation',
      value: `${precipitation} mm`
    }
  ]
  

  return (
    <div className="flex flex-col gap-8">
      <div className="card-bg-large h-[286px] rounded-[20px] p-6 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[28px] mb-3">{location?.city}, {location?.state}, {location?.country}</h2>
           <p className="font-medium text-lg opacity-80">{format(new Date(), 'EEEE, MMM d, yyyy')}</p> 
        </div>  
        <div className="flex items-center gap-5">
          <span>
            <img src={icon} alt={description} className="w-[120px] aspect-square" /> 
          </span>
          <span className="font-semibold text-8xl tracking-tighter italic">{Math.floor(temperature_2m)}°</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        
        {
          weatherInfo.map(({title, value}) => (
            <div 
              key={title}
              className="p-5 rounded-lg bg-primary border border-border"  
            >
              <h3 className="text-accent-foreground font-medium text-lg">{title}</h3>
              <p className="font-light text-[32px]">{value}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CurrentWeatherData