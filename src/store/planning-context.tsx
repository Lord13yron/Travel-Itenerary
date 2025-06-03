import { createContext, useContext, useState } from "react";

type PlanningContextValue = {
  isPlanning: boolean;
  setIsPlanning: (isPlanning: boolean) => void;
  tripId: number;
  setTripId: (tripId: number) => void;
};

const PlanningContext = createContext<PlanningContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function usePlanningContext() {
  const context = useContext(PlanningContext);
  if (!context) {
    throw new Error(
      "usePlanningContext must be used within a PlanningProvider"
    );
  }
  return context;
}

type PlanningProviderProps = {
  children: React.ReactNode;
};

export default function PlanningProvider({ children }: PlanningProviderProps) {
  const [isPlanning, setIsPlanning] = useState(false);
  const [tripId, setTripId] = useState(0);

  return (
    <PlanningContext.Provider
      value={{ isPlanning, setIsPlanning, tripId, setTripId }}
    >
      {children}
    </PlanningContext.Provider>
  );
}
