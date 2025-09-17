import { useState } from "react";
import { UnitContext, type Unit } from "./unit-context";


export const UnitProvider = ({ children }: { children: React.ReactNode }) => {
  const [unit, setUnit] = useState<Unit>("metric");
  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
};