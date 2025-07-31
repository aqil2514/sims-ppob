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
    return (
      <MainContainer className="flex justify-center items-center min-h-[300px]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-red-500 mb-2" />
          <p className="text-sm text-gray-500">Memuat data profil...</p>
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer className="flex justify-center">
      <ProfileForm defaultValues={data} />
    </MainContainer>
  );
}
