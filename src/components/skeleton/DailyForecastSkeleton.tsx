const DailyForecastSkeleton = () => {
  return (
    <section>
      <h2 className="font-semibold text-xl leading-[1.2] mb-5">Daily forecast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
        {
          Array.from({length: 7}).map((_, idx) => (
            <div key={idx} className="border bg-primary py-4 px-2.5 rounded-lg h-[166.4px]">
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default DailyForecastSkeleton