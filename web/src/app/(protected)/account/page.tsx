import AccountTemplate from "@/components/templates/(protected)/AccountTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akun",
};

export default function AccountPage() {
  return <AccountTemplate />;
}
