import InputField from "@/subcomponents/InputField";
import { useGeolocation } from "../hooks/use-geolocation"
import { useReverseGeocodeQuery, useWeatherQuery } from "../hooks/use-query";
import CurrentWeatherData from "@/components/CurrentWeatherData";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import { useUnit } from "@/context/unit-context";

const Home = () => {
  
  const { unit } = useUnit()
  const { coordinates, error: locationError, isLoading: locationLoading, getLocation } = useGeolocation();
  const weatherQuery = useWeatherQuery(coordinates, unit);
  const location = useReverseGeocodeQuery(coordinates);

  // console.log(location.data)
  // console.log(coordinates)
  // console.log(weatherQuery.data)

  if (locationLoading) {
    return <div>Someins wrong</div>
  }

  if (locationError) {
    return (
      <div>Enable Location</div>
    )
  }

  if (!coordinates) {
    return (
      <div>Enable Location</div>
    );
  }

  const locationData = location.data?.address;

  if (weatherQuery.error) {
    return (
      <div>Weather Fetching error</div>
    )
  }

  if (!weatherQuery.data) {
    return <div>Someins wrong with weather data</div>
  }

  return (
    <div className="flex flex-col mx-4 sm:mx-6 xl:mx-28">
      <h1 className="font-bold text-[52px] text-center font-heading leading-[1.2] my-12 mx-2 sm:my-16 sm:mx-32">How’s the sky looking today?</h1>
      <InputField />
      <section className="mt-8 lg:mt-12 mb-12 sm:mb-20">
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