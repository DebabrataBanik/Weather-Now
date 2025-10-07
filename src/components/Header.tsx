// import { useTheme } from "@/context/theme-context";
// import { Sun, Moon } from "lucide-react";
import Logo from '@/assets/images/logo.svg'
import { Link } from 'react-router-dom'
import UnitSelect from "@/components/subcomponents/UnitSelect";

const Header = () => {
  // const { theme, setTheme } = useTheme();
  // const isLight = theme === 'light';


  return (
    <header className="mx-4 mt-4 sm:mx-6 sm:mt-6 xl:mx-28 lg:mt-12">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt='Logo' className="w-42 sm:w-52" />
        </Link>
        <div className="flex items-center gap-5">
          {/* <button 
            className={`flex items-center cursor-pointer transition-transform duration-500 ${isLight ? 'rotate-0' : 'rotate-180'}`}
            onClick={() => setTheme(isLight ? 'dark' : 'light')} 
          >
            {
              isLight ? 
              <Moon className="h-6 w-6" />
              :
              <Sun className="h-6 w-6" />
            }
          </button> */}
          
          <UnitSelect />
        </div>
      </div>
    </header>
  )
}

export default Header