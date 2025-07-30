import RegisterTemplate from "@/components/templates/(auth)/RegisterTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrasi",
};

export default function RegisterPage() {
  return <RegisterTemplate />;
}
