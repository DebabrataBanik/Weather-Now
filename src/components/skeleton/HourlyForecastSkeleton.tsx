import Dropdown from '@/assets/images/icon-dropdown.svg'

const HourlyForecastSkeleton = () => {
  return (
    <section className="w-full bg-primary rounded-3xl flex flex-col gap-4 px-4 py-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl leading-[1.2]">Hourly forecast</h2>
        <div className="rounded-[8px] font-medium bg-border px-4 py-2 flex items-center gap-3">
          <span className='font-medium -translate-y-0.5'>–</span>
          <img src={Dropdown} />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
          {
            Array.from({length: 8}).map((_, idx) => (
              <div key={idx} className='bg-secondary border rounded-[8px] h-[60px]' >

              </div>
            ))
          }
        </div>
    </section>
  )
}

export default HourlyForecastSkeleton