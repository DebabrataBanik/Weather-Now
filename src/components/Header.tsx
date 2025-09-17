import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";
import Logo from '@/assets/images/logo.svg'
import { useUnit } from "@/context/unit-context";

const Header = () => {

  const { unit, setUnit } = useUnit();
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';


  return (
    <header className="px-28 pt-12">
      <div className="flex items-center justify-between">
        <img src={Logo} />
        <div className="flex items-center gap-5">
          <button 
            className={`flex items-center cursor-pointer transition-transform duration-500 ${isLight ? 'rotate-0' : 'rotate-180'}`}
            onClick={() => setTheme(isLight ? 'dark' : 'light')} 
          >
            {
              isLight ? 
              <Moon className="h-6 w-6" />
              :
              <Sun className="h-6 w-6" />
            }
          </button>
          
          <select name="units" id="units" value={unit} onChange={e => setUnit(e.target.value as "metric" | "imperial")} className="pr-10 py-3 pl-4 bg-primary rounded-[8px] font-medium leading-[1.2]">
            <option value='imperial'>Switch to Imperial</option>
            <option value='metric'>Switch to Metric</option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default Header