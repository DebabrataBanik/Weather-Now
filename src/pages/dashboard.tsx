import InputField from "@/components/InputField";
import { useGeolocation } from "../hooks/use-geolocation"
import { useReverseGeocodeQuery, useWeatherQuery } from "../hooks/use-query";
import CurrentWeatherData from "@/components/CurrentWeatherData";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";

const Home = () => {

  const { coordinates, error: locationError, isLoading: locationLoading, getLocation } = useGeolocation();
  const weatherQuery = useWeatherQuery(coordinates);
  const location = useReverseGeocodeQuery(coordinates);

  console.log(location.data)
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
    <div className="flex flex-col mx-28">
      <h1 className="font-bold text-[52px] text-center font-heading leading-[1.25] my-16">How’s the sky looking today?</h1>
      <InputField />
      <section className="mt-12 mb-20">
        <div className="flex gap-8">
          <div className="flex flex-col w-[800px] gap-12">
            <CurrentWeatherData data={weatherQuery.data} location={locationData} />
            <DailyForecast data={weatherQuery.data} />
          </div>
          <div className="flex-1">
            <HourlyForecast data={weatherQuery.data} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home