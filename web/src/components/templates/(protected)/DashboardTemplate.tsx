"use client";
import MainContainer from "@/components/layout/MainContainer";
import DashboardProvider from "@/components/providers/DashboardProvider";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardResources } from "@/lib/api-fetch";
import useSWR from "swr";

export default function DashboardTemplate() {
  const { token } = useAuth();

  const { data, error, isLoading } = useSWR(
    token ? ["profile", token] : null,
    () => getDashboardResources(token!)
  );

  return (
    <DashboardProvider data={data}>
      <MainContainer>Dashboard</MainContainer>
    </DashboardProvider>
  );
}
