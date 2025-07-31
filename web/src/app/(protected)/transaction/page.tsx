import TransactionTemplate from "@/components/templates/(protected)/TransactionTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Transaksi",
};

export default function TransactionPage() {
    return <TransactionTemplate />
}
