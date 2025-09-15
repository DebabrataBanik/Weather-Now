import type { WeatherResponse } from "@/types/weather"
import { getWeatherInfo } from "@/utils/weather-code-map";
import { format } from 'date-fns'

interface HourlyForecastProps{
  data: WeatherResponse;
}

const HourlyForecast = ({data}: HourlyForecastProps) => {

  const { temperature_2m, time, weather_code } = data.hourly;

  const now = new Date();

  const curIdx = time.findIndex(item => {
    const date = new Date(item)
    return now.getHours() === date.getHours();
  })

  const currentArr = time.slice(curIdx, curIdx+7)
  console.log(currentArr)


  return (
    <section className="w-full bg-primary rounded-3xl flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl leading-[1.2]">Hourly forecast</h2>
        <select className="rounded-[8px] font-medium bg-border outline-0 px-4 pr-10 py-2 cursor-pointer" name="day" id="day">
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        
          {
            currentArr.map((t, idx) => {

              const {icon, description} = getWeatherInfo(weather_code[curIdx+idx])
              const time = format(new Date(t), 'h a')
              const temp = temperature_2m[curIdx+idx]

              return(
                <div className="flex items-center gap-2 justify-between bg-secondary border border-border rounded-[8px] py-2.5 pl-3 pr-4">
                  <img  src={icon} alt={description} className="w-10" />
                  <span className="uppercase font-medium text-xl leading-[1.2] mr-auto">{time}</span>
                  <span className="font-medium leading-[1.2]">{Math.round(temp)}°</span>
                </div>
              )
            })
          }
          {/* <img />
          <span>Time</span>
          <span>Temo</span> */}
      </div>
    </section>
  )
}

export default HourlyForecast