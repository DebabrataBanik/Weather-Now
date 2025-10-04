import type { WeatherResponse } from "@/types/weather"
import { getWeatherInfo } from "@/utils/weather-code-map";
import { format } from 'date-fns'
import { useState } from "react";
import { getNext7Days, getToday } from "@/utils/days-helper";
import { getHourlyData } from "@/utils/hourly-data-helper";

interface HourlyForecastProps{
  data: WeatherResponse;
}

const HourlyForecast = ({data}: HourlyForecastProps) => {

  const today = getToday()
  const [selectedDay, setSelectedDay] = useState(today)

  const nextDays = getNext7Days();

  const hourlyForecastArr = getHourlyData(data.hourly, selectedDay)

  return (
    <section className="w-full max-h-[696px] bg-primary rounded-3xl flex flex-col gap-4 px-4 py-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl leading-[1.2]">Hourly forecast</h2>
        <select 
          className="rounded-[8px] font-medium bg-border outline-0 px-4 pr-10 py-2 cursor-pointer" 
          name="day" 
          id="day"
          value={selectedDay}
          onChange={e => setSelectedDay(e.target.value)}
        >
          {
            nextDays.map(({label, value}) => (
                <option key={value} value={value}>{label}</option>
              )
            )
          }
        </select>
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-none">
        
        {
          hourlyForecastArr.map(({time,temp,code}) => {

            const {icon, description} = getWeatherInfo(code)
            const t = format(new Date(time), 'h a')

            return (
              <div key={time} className="flex items-center gap-2 justify-between bg-secondary border rounded-[8px] min-h-[60px] pl-3 pr-4">
                <img  src={icon} alt={description} title={description} className="w-10" />
                <span className="uppercase font-medium text-xl leading-[1.2] mr-auto">{t}</span>
                <span className="font-medium leading-[1.2]">{Math.round(temp)}°</span>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default HourlyForecast