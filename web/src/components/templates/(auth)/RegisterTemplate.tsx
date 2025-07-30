"use client";
import AuthIllustration from "@/components/atoms/AuthIllustration";
import MainContainer from "@/components/layout/MainContainer";
import AuthCard from "@/components/molecules/card/AuthCard";
import RegisterForm from "@/components/molecules/forms/RegisterForm";

export default function RegisterTemplate() {
  return (
    <MainContainer className="grid grid-cols-2">
      <AuthCard
        topDescription="Lengkapi data untuk"
        bottomDescription="membuat akun"
        Form={<RegisterForm />}
        footer="sudah punya akun? login "
        footerLink="/login"
        footerLinkLabel="di sini"
      />
      <AuthIllustration />
    </MainContainer>
  );
}
