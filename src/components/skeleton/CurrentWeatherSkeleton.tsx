const CurrentWeatherSkeleton = () => {

  const weatherInfo: string[] = [
    'Feels Like', 'Humidity', 'Wind', 'Precipitation'
  ]

  return (
    <div className="flex flex-col lg:gap-8 gap-5">
      <div className="flex flex-col items-center rounded-[20px] bg-primary justify-center h-[286px]">
        <div className="flex items-center gap-2.5 mb-3.5">
          <span className="w-3 h-3 animate-pulse rounded-full bg-white/80"></span>
          <span className="w-3 h-3 animate-pulse rounded-full -translate-y-1.5 bg-white/80"></span>
          <span className="w-3 h-3 animate-pulse rounded-full bg-white/80"></span>
        </div>
        <p className="font-medium text-lg leading-[1.2] text-accent-foreground">Loading...</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:gap-6 gap-5">
        {
          weatherInfo.map((label, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-lg bg-primary border"
            >
              <h3 className="text-accent-foreground font-medium text-lg">{label}</h3>
              <p className="font-light text-[32px] translate-y-1">–</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CurrentWeatherSkeleton