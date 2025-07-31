import { Service } from "@/@types/data";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog, { Status } from "../dialog/ConfirmDialog";
import axios, { isAxiosError } from "axios";
import { api } from "@/variables/api";
import { useAuth } from "@/hooks/useAuth";

interface ServiceCardProps {
  service?: Service;
  balance?: number;
}

export function ServiceCard({ service, balance }: ServiceCardProps) {
  const { token } = useAuth();
  const [nominal, setNominal] = useState<number>(0);
  if (!service || !balance) return <ServiceCardSkeleton />;

  const clickHandler = async () => {
    const isEnoughBalance = balance >= nominal;
    const isNull = nominal === 0;

    if (isNull || isNaN(nominal)) {
      toast.error("Jumlah pembelian tidak valid!");
      throw new Error("Jumlah pembelian tidak valid");
    }

    if (!isEnoughBalance) {
      toast.error("Saldo tidak cukup!");
      throw new Error("Saldo tidak cukup");
    }

    try {
      const { data } = await axios.post(
        `${api}/transaction`,
        {
          service_code: service.service_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message ?? "Pembelian berhasil");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data.message ?? "Terjadi kesalahan");
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui");
      }
      throw error;
    }
  };

  const statusText: Record<Status, string> = {
    idle: `Beli ${service.service_name} senilai`,
    success: `Pembayaran ${service.service_name} sebesar`,
    error: `Pembayaran ${service.service_name} sebesar`,
    loading: `Memproses pembayaran`,
  };

  return (
    <div className="space-y-4">
      <h1>Pembayaran</h1>
      <div className="flex gap-1 items-center">
        <Image
          src={service.service_icon}
          alt={service.service_name}
          width={40}
          height={40}
          sizes="auto"
          priority
          className="rounded-md"
        />
        <span className="text-sm text-center font-medium">
          {service.service_name}
        </span>
      </div>
      <div className="space-y-4 relative">
        <Input
          value={nominal}
          onChange={(e) => setNominal(e.target.valueAsNumber)}
          type="number"
          className="bg-white pl-8"
        />
        <Banknote className="w-6 h-6 absolute top-1.5 left-1.5 text-gray-500" />
      </div>
      <ConfirmDialog
        nominal={nominal}
        onConfirm={clickHandler}
        variant="service"
        statusText={statusText}
      />
    </div>
  );
}

const ServiceCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <h1>Pembayaran</h1>
      <div className="flex gap-1 items-center">
        <Skeleton className="rounded-md w-10 h-10" />
        <Skeleton className="text-sm text-center font-medium w-64 h-10" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
};
