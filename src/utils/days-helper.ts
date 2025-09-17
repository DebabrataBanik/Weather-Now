import { addDays, format } from "date-fns";
import type { DaysOption } from "@/types/weather";

export const getNext7Days = (): DaysOption[] => {
  const days: DaysOption[] = [];

  for(let i=0;i<7;i++){
    const date = addDays(new Date(), i)
    const value = format(date, 'yyyy-MM-dd');
    const label = format(date, 'EEEE');
    days.push({value, label})
  }
  return days;
}

export const getToday = ():string => {
  return format(new Date(), 'yyyy-MM-dd');
}