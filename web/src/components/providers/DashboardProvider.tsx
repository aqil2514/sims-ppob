import { Banner, Service } from "@/@types/data";
import { Balance, Profile } from "@/@types/user";
import React, { createContext, useContext } from "react";
import { SWRResponse } from "swr";

interface Data {
  profile: Profile;
  balance: Balance;
  services: Service[];
  banners: Banner[];
}

interface DashboardContextState {
  swr:SWRResponse<Data>;
}

const DashboardContext = createContext<DashboardContextState>(
  {} as DashboardContextState
);

interface DashboardProviderProps extends DashboardContextState {
  children: React.ReactNode;
}

export default function DashboardProvider({
  children,
  swr,
}: DashboardProviderProps) {
  const value: DashboardContextState = {
    swr,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardData = () => useContext(DashboardContext);
