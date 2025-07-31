"use client";
import MainContainer from "@/components/layout/MainContainer";
import ProfileForm from "@/components/molecules/forms/ProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/lib/api-fetch";
import useSWR from "swr";

export default function AccountTemplate() {
  const { token } = useAuth();
  const { data, isLoading } = useSWR("profile", () => getProfile(token!));

  if (isLoading || !data) {
    return <MainContainer>Loading...</MainContainer>;
  }

  return (
    <MainContainer className="flex justify-center">
      <ProfileForm defaultValues={data} />
    </MainContainer>
  );
}
