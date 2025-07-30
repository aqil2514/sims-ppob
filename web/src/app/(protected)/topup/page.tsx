import TopupTemplate from "@/components/templates/(protected)/TopupTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Up",
};

export default function TopupPage() {
  return <TopupTemplate />
}
