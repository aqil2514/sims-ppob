"use client";
import MainContainer from "@/components/layout/MainContainer";
import BannerSliderCard from "@/components/molecules/card/BannerSliderCard";
import ProfileAndBalance from "@/components/organisms/ProfileAndBalance";
import DashboardProvider, {
  useDashboardData,
} from "@/components/providers/DashboardProvider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardResources } from "@/lib/api-fetch";
import Image from "next/image";
import useSWR from "swr";

export default function DashboardTemplate() {
  const { token } = useAuth();

  const swr = useSWR(token ? ["profile", token] : null, () =>
    getDashboardResources(token!)
  );

  return (
    <DashboardProvider swr={swr}>
      <MainContainer>
        <TopSection />
        <MiddleSection />
        <BottomSection />
      </MainContainer>
    </DashboardProvider>
  );
}

const TopSection = () => {
  const { swr } = useDashboardData();
  const profile = swr.data?.profile;
  const balance = swr.data?.balance?.balance;

  return <ProfileAndBalance balance={balance} profile={profile} />
};

const MiddleSection = () => {
  const { swr } = useDashboardData();
  const services = swr.data?.services;
  const isLoading = !services;

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-2">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 min-w-[64px]"
              >
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          : services.map((service) => (
              <div
                key={service.service_code}
                className="flex flex-col items-center space-y-1 min-w-[64px]"
              >
                <Image
                  src={service.service_icon}
                  alt={service.service_name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-sm text-center font-medium">
                  {service.service_name}
                </span>
              </div>
            ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const BottomSection = () => {
  const { swr } = useDashboardData();
  const banners = swr.data?.banners;

  return (
    <div className="w-full mt-6">
      <h2 className="text-base font-semibold mb-3 text-primary">
        Temukan Promo Menarik
      </h2>
      <BannerSliderCard banners={banners} />
    </div>
  );
};
