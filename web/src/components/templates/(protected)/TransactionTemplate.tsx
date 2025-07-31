"use client";
import MainContainer from "@/components/layout/MainContainer";
import HistoryCard from "@/components/molecules/card/HistoryCard";
import ProfileAndBalance from "@/components/organisms/ProfileAndBalance";
import { useAuth } from "@/hooks/useAuth";
import { getTransactionResource } from "@/lib/api-fetch";
import { useState } from "react";
import useSWR from "swr";

export default function TransactionTemplate() {
  const { token } = useAuth();
  const [limit, setLimit] = useState<number>(5);

  const swr = useSWR(token ? ["profile", token, limit] : null, () =>
    getTransactionResource(token!, limit)
  );

const isLoadingMore = !swr.isLoading && swr.isValidating;

  return (
    <MainContainer>
      <ProfileAndBalance
        balance={swr.data?.balance.balance}
        profile={swr.data?.profile}
      />
      <HistoryCard
        histories={swr.data?.transactionHistory}
        setLimit={setLimit}
        limit={limit}
        isLoadingMore={isLoadingMore}
      />
    </MainContainer>
  );
}
