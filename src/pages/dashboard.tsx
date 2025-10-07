import InputField from "@/components/subcomponents/InputField";
import { useGeolocation } from "../hooks/use-geolocation"
import { useReverseGeocodeQuery, useWeatherQuery } from "../hooks/use-query";
import CurrentWeatherData from "@/components/CurrentWeatherData";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import { useUnit } from "@/context/unit-context";
import Retry from '@/assets/images/icon-retry.svg'
import Error from '@/assets/images/icon-error.svg'
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import WeatherHelmet from "@/components/subcomponents/WeatherHelmet";
import { formatLocation } from "@/utils/location";
import { useEffect, useRef } from "react";
import type { Coordinates } from "@/types/weather";
import { toast } from "sonner";

const defaultCoordinates: Coordinates = {
  lat: 28.6139,
  lon: 77.2090
}

const Home = () => {
  
  const { unit } = useUnit()
  const { coordinates, isLoading: locationLoading, error: locationError, getLocation} = useGeolocation();
  const coords = coordinates || defaultCoordinates;
  const weatherQuery = useWeatherQuery(coords, unit);
  const location = useReverseGeocodeQuery(coords);

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasScrolledRef = useRef(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (weatherQuery.data && location.data && !hasScrolledRef.current) {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    scrollTimerRef.current = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        hasScrolledRef.current = true;
      }
      scrollTimerRef.current = null;
    }, 500);
  }
  
  const didToastRef = useRef(false);
  useEffect(() => {
    if (!locationError || didToastRef.current) return;
    didToastRef.current = true;

    toast.info("We couldn't access your location", {
      description: "New Delhi is shown as a fallback. You can enable location anytime.",
      action: { label: "Try again", onClick: () => getLocation() },
      duration: 5000
    });
  }, [locationError, getLocation]);

  if (!locationLoading && weatherQuery.error) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 mt-16 gap-6">
        <img src={Error} alt="Error Icon" className="w-10" />
        <h1 className="font-heading font-bold text-[52px] leading-[1.2]">Something went wrong</h1>
        <p className="w-[554px] text-center text-accent-foreground font-medium text-xl leading-[1.2]">We couldn’t connect to the server (API error). Please try again in a few moments.</p>
        <button
          onClick={() => weatherQuery.refetch()} 
          disabled={weatherQuery.isFetching}
          className="rounded-[8px] bg-primary px-4 py-3 flex items-center gap-2.5 cursor-pointer">
          <img src={Retry} alt="Retry Icon" className="w-4" />
          <span className="font-medium leading-[1.2]">Retry</span>
        </button>
      </div>
    )
  }
  
  const locationData = location.data?.address;
  const locationName = locationData ? formatLocation(locationData) : 'Current Weather';

  if(locationLoading || weatherQuery.isLoading || location.isLoading || !weatherQuery.data){
    return (
      <div className="flex flex-col mx-4 sm:mx-6 xl:mx-28">
        <h1 className="font-bold text-[52px] text-center font-heading leading-[1.2] my-12 mx-2 sm:my-16 sm:mx-32">How’s the sky looking today?</h1>
        <InputField />
        <DashboardSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col mx-4 sm:mx-6 xl:mx-28">
      <WeatherHelmet data={weatherQuery.data} location={locationName} />
      <h1 className="font-bold text-[52px] text-center font-heading leading-[1.2] my-12 mx-2 sm:my-16 sm:mx-32">How’s the sky looking today?</h1>
      <InputField />
      
      <section ref={sectionRef} className="mt-8 lg:mt-12 mb-12 sm:mb-20">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-8">
          <div className="flex flex-col col-span-4 sm:col-span-12 lg:col-span-8 lg:gap-12 gap-8">
            <CurrentWeatherData data={weatherQuery.data} location={locationData} />
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

export default Home