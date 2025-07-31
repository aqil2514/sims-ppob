"use client";

import AuthIllustration from "@/components/atoms/AuthIllustration";
import MainContainer from "@/components/layout/MainContainer";
import AuthCard from "@/components/molecules/card/AuthCard";
import LoginForm from "@/components/molecules/forms/LoginForm";

export default function LoginTemplate() {
  return (
    <MainContainer className="grid grid-cols-1 md:grid-cols-2">
      <AuthCard
        topDescription="Masuk atau buat akun"
        bottomDescription="untuk memulai"
        Form={<LoginForm />}
        footer="belum punya akun? registrasi "
        footerLink="/registration"
        footerLinkLabel="di sini"
      />
      <AuthIllustration />
    </MainContainer>
  );
}
