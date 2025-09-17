import { createContext, useContext } from 'react'

export type Unit = 'metric' | 'imperial';

export interface UnitContextValue {
  unit: Unit;
  setUnit: (u: Unit) => void;
}

export const UnitContext = createContext<UnitContextValue | undefined>(undefined);

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) throw new Error("useUnit must be used inside UnitProvider");
  return context;
};