import { Banner, Service } from "@/@types/data";
import { Balance, Profile } from "@/@types/user";
import React, { createContext, useContext } from "react";

interface DashboardContextState {
  data:
    | {
        profile: Profile;
        balance: Balance;
        services: Service[];
        banners: Banner[];
      }
    | undefined;
}

const DashboardContext = createContext<DashboardContextState>(
  {} as DashboardContextState
);

interface DashboardProviderProps extends DashboardContextState {
  children: React.ReactNode;
}

export default function DashboardProvider({
  children,
  data,
}: DashboardProviderProps) {
  const value: DashboardContextState = {
    data,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardData = () => useContext(DashboardContext);
