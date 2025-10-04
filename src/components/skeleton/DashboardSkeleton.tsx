import CurrentWeatherSkeleton from "./CurrentWeatherSkeleton"
import DailyForecastSkeleton from "./DailyForecastSkeleton"
import HourlyForecastSkeleton from "./HourlyForecastSkeleton"

const DashboardSkeleton = () => {
  return (
    <section className="mt-8 lg:mt-12 mb-12 sm:mb-20">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-8">
        <div className="flex flex-col col-span-4 sm:col-span-12 lg:col-span-8 lg:gap-12 gap-8">
          <CurrentWeatherSkeleton />
          <DailyForecastSkeleton />
        </div>
        <div className="col-span-4 sm:col-span-12 lg:col-span-4">
          <HourlyForecastSkeleton />
        </div>
      </div>
    </section>
  )
}

export default DashboardSkeleton