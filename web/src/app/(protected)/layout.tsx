"use client";
import Header from "@/components/layout/Header";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { isAuthenticated } = auth;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <main>
      <Header />

      {children}
    </main>
  );
}
