import InputField from "@/subcomponents/InputField";
import { useGeolocation } from "../hooks/use-geolocation"
import { useReverseGeocodeQuery, useWeatherQuery } from "../hooks/use-query";
import CurrentWeatherData from "@/components/CurrentWeatherData";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import { useUnit } from "@/context/unit-context";
import Retry from '@/assets/images/icon-retry.svg'
import Error from '@/assets/images/icon-error.svg'

const Home = () => {
  
  const { unit } = useUnit()
  const { coordinates, error: locationError, isLoading: locationLoading } = useGeolocation();
  const weatherQuery = useWeatherQuery(coordinates, unit);
  const location = useReverseGeocodeQuery(coordinates);

  if (locationLoading) {
    return <div>Someins wrong</div>
  }

  if (locationError) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 mt-16 gap-6">
        <img src={Error} className="w-10" />
        <h1 className="font-heading font-bold text-[52px] leading-[1.2]">Location Access Denied</h1>
        <p className="text-accent-foreground font-medium text-xl leading-[1.2]">We couldn't fetch coordinates. Please provide location access.</p>
        <button
          onClick={() => window.location.reload()} 
          className="rounded-[8px] bg-primary px-4 py-3 flex items-center gap-2.5">
          <img src={Retry} className="w-4" />
          <span className="font-medium leading-[1.2]">Retry</span>
        </button>
      </div>
    )
  }
  
  if (!coordinates) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 mt-16 gap-6">
        <img src={Error} className="w-10" />
        <h1 className="font-heading font-bold text-[52px] leading-[1.2]">Couldn't fetch coordinates</h1>
        <p className="text-accent-foreground font-medium text-xl leading-[1.2]">We couldn't fetch coordinates. Please try again.</p>
        <button
          onClick={() => window.location.reload()} 
          className="rounded-[8px] bg-primary px-4 py-3 flex items-center gap-2.5 cursor-pointer">
          <img src={Retry} className="w-4" />
          <span className="font-medium leading-[1.2]">Retry</span>
        </button>
      </div>
    );
  }
  
  const locationData = location.data?.address;

  if (weatherQuery.error || !weatherQuery.data) {
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

  return (
    <div className="flex flex-col mx-4 sm:mx-6 xl:mx-28">
      <h1 className="font-bold text-[52px] text-center font-heading leading-[1.2] my-12 mx-2 sm:my-16 sm:mx-32">How’s the sky looking today?</h1>
      <InputField />
      <section className="mt-8 lg:mt-12 mb-12 sm:mb-20">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-8">
          <div className="flex flex-col col-span-4 sm:col-span-12 lg:col-span-8 lg:gap-12 gap-8">
            <CurrentWeatherData data={weatherQuery.data!} location={locationData} />
            <DailyForecast data={weatherQuery.data!} />
          </div>
          <div className="col-span-4 sm:col-span-12 lg:col-span-4">
            <HourlyForecast data={weatherQuery.data!} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home