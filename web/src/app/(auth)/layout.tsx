import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Sims PPOB Muhamad Aqil Maulana",
    default: "Login | Sims PPOB Muhamad Aqil Maulana ",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
