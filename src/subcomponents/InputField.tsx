import { useSearchLocationQuery } from "@/hooks/use-query"
import { Command, CommandList, CommandItem } from "@/components/ui/command"
import { Search } from "lucide-react"
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
  }

  const handleSelect = (data: string) => {
    setSelectData(data)
    const [lat,lon, name, admin1 = '', country = ''] = data.split('|')
    setQuery(
      `${name}${admin1 ? `, ${admin1}` : ''}${country ? `, ${country}` : ''}`
    );
  }

  return (
    <div className="flex items-center gap-4 mx-auto">
      <Command className="relative rounded-[12px] focus:outline-2 focus:outline-white focus:outline-offset-2 overflow-visible">
        <label className="relative" htmlFor="input">
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="input"
            id="input"
            placeholder="Search for a place..."
            className="flex items-center bg-primary h-14 w-[526px] px-6 pl-[60px] pb-1 rounded-[12px] font-medium font-sans text-xl placeholder:text-accent-foreground " 
          />
            <Search className="absolute top-1/2 -translate-y-1/2 left-6 w-5 h-5 text-accent-foreground" />
        </label>
        {
          isLoading ? 
          <CommandList className="absolute top-14 mt-2.5 w-full z-10 bg-primary border border-secondary rounded-[12px] p-2">
            <div className="font-medium leading-[1.2] px-2 py-2.5 flex items-center gap-2.5">
              <img src={Loading} className="w-4 h-4" />
              <span>Search in progress</span>
            </div>
          </CommandList> 
          :
          data?.results && 
          <CommandList className="absolute top-14 mt-2.5 w-full z-10 bg-primary border border-secondary rounded-[12px] p-2">
            <div className="flex flex-col gap-1">
              {
                  data?.results?.map(res => {
                    return (
                      <CommandItem 
                        key={res.id}
                        value={`${res.latitude}|${res.longitude}|${res.name}|${res.admin1 ?? ''}|${res.country ?? ''}|${res.country_code ?? ''}`}
                        onSelect={handleSelect} 
                        className="font-medium leading-[1.2] px-2 py-2.5 rounded-[8px] border border-transparent hover:!bg-secondary hover:!border-border data-[selected=true]:!bg-secondary data-[selected=true]:!border-border data-[selected=true]:text-white">
                        <span>{res.name}{res.admin1 ? `, ${res.admin1}` : ''}{res.country ? `, ${res.country}` : ''}</span>
                      </CommandItem>
                    )
                  })
              } 
            </div>
          </CommandList>
        }
      </Command>
      <button
        onClick={handleSubmit}  
        disabled={!selectData}
        className="bg-card-primary px-6 rounded-xl leading-14 text-xl font-medium cursor-pointer focus:outline-2 focus:outline-card-primary focus:outline-offset-2">
          Search
      </button>


    </div>
  )
}

export default InputField