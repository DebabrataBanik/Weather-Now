import { useSearchLocationQuery } from "@/hooks/use-query"
import { Command, CommandList, CommandItem } from "@/components/ui/command"
import Search from '@/assets/images/icon-search.svg'
import Loading from '@/assets/images/icon-loading.svg'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const InputField = () => {

  const [query, setQuery] = useState('')
  const { data, isLoading } = useSearchLocationQuery(query);
  const [selectData, setSelectData] = useState('')

  const navigate = useNavigate();

  const handleSubmit = () => {
    const [lat, lon, name, admin1, country] = selectData.split('|')
    navigate(`/city/${name}?state=${admin1}&country=${country}&lat=${lat}&lon=${lon}`)
    setQuery('')
    setSelectData('')
  }

  const handleSelect = (data: string) => {
    setSelectData(data)
    const [,, name, admin1 = '', country = ''] = data.split('|')
    setQuery(
      `${name}${admin1 ? `, ${admin1}` : ''}${country ? `, ${country}` : ''}`
    );
  }

  const showDropdown = query.length > 2 && !selectData && (isLoading || data);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:mx-auto">
      <Command className="relative rounded-[12px] overflow-visible">
        <label className="relative w-full" htmlFor="input">
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="input"
            id="input"
            placeholder="Search for a place..."
            className="flex items-center w-full bg-primary h-14 lg:w-[526px] px-6 pl-[60px] pb-1 rounded-[12px] font-medium font-sans text-xl leading-[1.2] placeholder:text-accent-foreground hover:bg-secondary transition-all duration-100 focus:outline-2 focus:outline-white focus:outline-offset-2"
          />
            <img src={Search} className="absolute top-1/2 -translate-y-1/2 left-6"/>
        </label>
        {
          showDropdown && (
            <CommandList className="absolute top-14 mt-2.5 w-full z-10 bg-primary border border-secondary rounded-[12px] p-2">
              {isLoading ? (
                <div className="font-medium leading-[1.2] px-2 py-2.5 flex items-center gap-2.5">
                  <img src={Loading} className="w-4 h-4 animate-spin" />
                  <span>Search in progress</span>
                </div>
              ) : data?.results && data.results.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {data.results.map(res => (
                    <CommandItem 
                      key={res.id}
                      value={`${res.latitude}|${res.longitude}|${res.name}|${res.admin1 ?? ''}|${res.country ?? ''}|${res.country_code ?? ''}`}
                      onSelect={handleSelect} 
                      className="font-medium leading-[1.2] px-2 py-2.5 rounded-[8px] border border-transparent hover:!bg-secondary hover:!border-border data-[selected=true]:!bg-secondary data-[selected=true]:!border-border data-[selected=true]:text-white">
                      <span>{res.name}{res.admin1 ? `, ${res.admin1}` : ''}{res.country ? `, ${res.country}` : ''}</span>
                    </CommandItem>
                  ))}
                </div>
              ) : (
                <div className="font-medium leading-[1.2] px-2 py-2.5">
                  No results found
                </div>
              )}
            </CommandList>
          )
        }
      </Command>
      <button
        onClick={handleSubmit}  
        disabled={!selectData}
        className="w-full sm:w-fit bg-card-primary px-6 rounded-xl leading-14 text-xl font-medium cursor-pointer hover:bg-card-secondary transition-all duration-100 focus:outline-2 focus:outline-offset-2 focus:outline-card-primary disabled:cursor-not-allowed disabled:bg-card-primary">
          Search
      </button>

    </div>
  )
}

export default InputField