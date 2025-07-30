"use client";
import MainContainer from "@/components/layout/MainContainer";
import TopupCard from "@/components/molecules/card/TopupCard";
import ProfileAndBalance from "@/components/organisms/ProfileAndBalance";
import { useAuth } from "@/hooks/useAuth";
import { getTopupResource } from "@/lib/api-fetch";
import useSWR from "swr";

export default function TopupTemplate() {
  const { token } = useAuth();

  const swr = useSWR(token ? ["profile", token] : null, () =>
    getTopupResource(token!)
  );

  return (
    <MainContainer>
      <ProfileAndBalance
        balance={swr.data?.balance.balance}
        profile={swr.data?.profile}
      />
      <TopupCard />
    </MainContainer>
  );
}