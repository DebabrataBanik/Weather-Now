import { Helmet } from "react-helmet-async"
import type { WeatherResponse } from "@/types/weather"
import { getWeatherInfo } from "@/utils/weather-code-map"

interface WeatherHelmetProps{
  data: WeatherResponse;
  location: string;
}

const WeatherHelmet = ({data, location}: WeatherHelmetProps) => {

  const {temperature_2m, weather_code} = data.current;
  const {description, icon} = getWeatherInfo(weather_code);

  const temp = Math.floor(temperature_2m);
  const title = `${temp}° ${description} - ${location}`

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" href={icon} type="image/webp" />
      <meta name='description' content={`Current weather in ${location}: ${temp}°, ${description}`} />
    </Helmet>
  )
}

export default WeatherHelmet