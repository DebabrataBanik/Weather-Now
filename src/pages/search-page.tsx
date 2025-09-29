import { useUnit } from "@/context/unit-context";
import { useWeatherQuery } from "@/hooks/use-query";
import type { Coordinates } from "@/types/weather";
import { useParams, useSearchParams } from "react-router-dom";
import InputField from "@/subcomponents/InputField";
import CurrentWeatherData from "@/components/CurrentWeatherData";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";

const NewWeatherPage = () => {

  const { unit } = useUnit()
  const [searchParams] = useSearchParams();
  const params = useParams()
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')
  const state = searchParams.get('state') || '';
  const country = searchParams.get('country') || '';

  const coords: Coordinates = {lat, lon}

  const weatherQuery = useWeatherQuery(coords, unit);
  
  if (weatherQuery.error) {
    return (
      <div>Weather Fetching error</div>
    )
  }

  if (!weatherQuery.data) {
    return <div>Someins wrong with weather data</div>
  }

  const locationData = `${params.city}${state ? `, ${state}`: ''}${country ? `, ${country}`: ''}`

  return (
    <div className="flex flex-col mx-4 sm:mx-6 xl:mx-28">
      <h1 className="font-bold text-[52px] text-center font-heading leading-[1.2] my-12 mx-2 sm:my-16 sm:mx-32">How’s the sky looking today?</h1>
      <InputField />
      <section className="mt-8 lg:mt-12 mb-12 sm:mb-20">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-8">
          <div className="flex flex-col col-span-4 sm:col-span-12 lg:col-span-8 lg:gap-12 gap-8">
            <CurrentWeatherData data={weatherQuery.data} address={locationData} />
            <DailyForecast data={weatherQuery.data} />
          </div>
          <div className="col-span-4 sm:col-span-12 lg:col-span-4">
            <HourlyForecast data={weatherQuery.data} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewWeatherPage;