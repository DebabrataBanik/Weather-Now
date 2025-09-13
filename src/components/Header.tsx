import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";
import Logo from '@/assets/images/logo.svg'

const Header = () => {

  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';


  console.log(theme)

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
          <select>
            <option>Switch to Imperial</option>
            <option>Switch to Metric</option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default Header