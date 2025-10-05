import { addDays, format } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import type { DaysOption } from "@/types/weather";

export const getNext7Days = (timezone: string): DaysOption[] => {
  const days: DaysOption[] = [];
  
  const now = toZonedTime(new Date(), timezone);

  for(let i=0;i<7;i++){
    const date = addDays(now, i);
    const value = format(date, 'yyyy-MM-dd');
    const label = format(date, 'EEEE');
    days.push({value, label})
  }
  return days;
}

export const getToday = (timezone: string): string => {
  const now = toZonedTime(new Date(), timezone);
  return format(now, 'yyyy-MM-dd');
}