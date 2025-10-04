import { useUnit } from "@/context/unit-context";
import { useWeatherQuery } from "@/hooks/use-query";
import type { Coordinates } from "@/types/weather";
import { useParams, useSearchParams } from "react-router-dom";
import InputField from "@/components/subcomponents/InputField";
import CurrentWeatherData from "@/components/CurrentWeatherData";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import Error from '@/assets/images/icon-error.svg'
import Retry from '@/assets/images/icon-retry.svg'
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";

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
      <div className="flex flex-col items-center justify-center pt-10 mt-16 gap-6">
        <img src={Error} className="w-10" />
        <h1 className="font-heading font-bold text-[52px] leading-[1.2]">Something went wrong</h1>
        <p className="w-[554px] text-center text-accent-foreground font-medium text-xl leading-[1.2]">We couldn’t connect to the server (API error). Please try again in a few moments.</p>
        <button
          onClick={() => weatherQuery.refetch()} 
          disabled={weatherQuery.isFetching}
          className="rounded-[8px] bg-primary px-4 py-3 flex items-center gap-2.5 cursor-pointer">
          <img src={Retry} className="w-4" />
          <span className="font-medium leading-[1.2]">Retry</span>
        </button>
      </div>
    )
  }
  
  const locationData = `${params.city}${state ? `, ${state}`: ''}${country ? `, ${country}`: ''}`

  if(weatherQuery.isLoading || !weatherQuery.data){
    return(
      <div className="flex flex-col mx-4 sm:mx-6 xl:mx-28">
        <h1 className="font-bold text-[52px] text-center font-heading leading-[1.2] my-12 mx-2 sm:my-16 sm:mx-32">How’s the sky looking today?</h1>
        <InputField />
        <DashboardSkeleton />
      </div>
    )
  }


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