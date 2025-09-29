import type { WeatherResponse } from "@/types/weather"
import { getWeatherInfo } from "@/utils/weather-code-map";

interface DailyForecastProps{
  data: WeatherResponse;
}

const DailyForecast = ({data}: DailyForecastProps) => {

  const {temperature_2m_max, temperature_2m_min, time, weather_code} = data.daily;

  return (
    <section>
      <h2 className="font-semibold text-xl leading-[1.2] mb-5">Daily forecast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
        {
          time.map((item, idx) => {
            const date = new Date(time[idx])
            const day = date.toLocaleDateString(undefined, { weekday: 'short'})
            const {description, icon} = getWeatherInfo(weather_code[idx])

            return (
            <div 
              key={item}
              className="border border-border bg-primary py-4 px-2.5 flex flex-col gap-4 items-center rounded-lg"  
            >
              <span className="font-medium text-lg leading-[1.2]" title={date.toLocaleDateString()} >{day}</span>
              
              <img src={icon} alt={description} title={description} className="w-[60px] aspect-square" />

              <p className="w-full flex items-center justify-between">
                <span className="font-medium leading-[1.2]">
                  {Math.round(temperature_2m_max[idx])}°
                </span>
                <span className="font-medium leading-[1.2]">
                  {Math.round(temperature_2m_min[idx])}°
                </span>
              </p>

            </div>
          )})
        }

      </div> 
    </section>
  )
}

export default DailyForecast