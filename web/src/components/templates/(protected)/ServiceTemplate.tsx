"use client";
import MainContainer from "@/components/layout/MainContainer";
import { ServiceCard } from "@/components/molecules/card/ServiceCard";
import ProfileAndBalance from "@/components/organisms/ProfileAndBalance";
import { useAuth } from "@/hooks/useAuth";
import { getServiceResource } from "@/lib/api-fetch";
import useSWR from "swr";

export default function ServiceTemplate({
  service_code,
}: {
  service_code: string;
}) {
  const { token } = useAuth();

  const swr = useSWR(token ? ["profile", token] : null, () =>
    getServiceResource(token!)
  );

  const service = swr.data?.services.find(
    (service) => service.service_code === service_code
  );

  return (
    <MainContainer>
      <ProfileAndBalance
        balance={swr.data?.balance.balance}
        profile={swr.data?.profile}
      />
      <ServiceCard service={service} balance={swr.data?.balance.balance} />
    </MainContainer>
  );
}
