import { useUnit } from "@/context/unit-context"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import UnitsIcon from '@/assets/images/icon-units.svg'
import Dropdown from '@/assets/images/icon-dropdown.svg'
import Check from '@/assets/images/icon-checkmark.svg'

const UnitSelect = () => {

  const { unit, setUnit } = useUnit()

  const itemClass = (active: boolean) => `flex items-center justify-between text-base font-medium leading-[1.2] px-2 py-2.5 ${active ? 'bg-secondary text-white rounded-[8px]' : ''}`

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="rounded-[8px] px-2.5 py-2 sm:px-4 sm:py-3 bg-primary">
          <button className="text-white flex gap-1.5 sm:gap-2.5 items-center cursor-pointer focus:outline-2 focus:outline-white focus:outline-offset-2">
            <img src={UnitsIcon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-sm sm:text-base font-medium leading-2.5">Units</span>
            <img src={Dropdown} className="w-2.5 h-4 sm:w-3 sm:h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-1 w-[214px] bg-primary rounded-lg px-2 py-1.5 border">
          {
            unit === "metric" ?  
            <DropdownMenuItem className="px-2 py-2.5 font-medium leading-[1.2] text-base hover:!bg-secondary hover:!text-white cursor-pointer" onClick={() => setUnit("imperial")}>
              Switch to Imperial
            </DropdownMenuItem>
            :
            <DropdownMenuItem className="px-2 py-2.5 font-medium leading-[1.2] text-base hover:!bg-secondary hover:!text-white cursor-pointer" onClick={() => setUnit("metric")}>
              Switch to Metric
            </DropdownMenuItem>
          }

          <DropdownMenuLabel className="text-sm font-medium text-muted-foreground leading-[1.2] px-2 pt-1.5">Temperature</DropdownMenuLabel>
          <div>
            <div className={itemClass(unit === 'metric')}>Celcius (°C)
              {unit === "metric" && <span><img src={Check} /></span>}
            </div>
            <div className={itemClass(unit === 'imperial')}>Fahrenheit (°F) {unit === "imperial" && <span><img src={Check} /></span>}</div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-sm font-medium text-muted-foreground leading-[1.2] px-2 pt-1.5">Wind Speed</DropdownMenuLabel>
          <div>
            <div className={itemClass(unit === 'metric')}>km/h {unit === "metric" && <span><img src={Check} /></span>}</div>
            <div className={itemClass(unit === 'imperial')}>mph {unit === "imperial" && <span><img src={Check} /></span>}</div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-sm font-medium text-muted-foreground leading-[1.2] px-2 pt-1.5">Precipitation</DropdownMenuLabel>
          <div>
            <div className={itemClass(unit === 'metric')}>Millimeters (mm) {unit === "metric" && <span><img src={Check} /></span>}</div>
            <div className={itemClass(unit === 'imperial')}>Inches (in){unit === "imperial" && <span><img src={Check} /></span>}</div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UnitSelect