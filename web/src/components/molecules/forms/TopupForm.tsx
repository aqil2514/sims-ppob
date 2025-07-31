import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/variables/api";
import axios, { isAxiosError } from "axios";
import { Banknote } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "../dialog/ConfirmDialog";

interface TopupFormProps {
  nominal: number;
  setNominal: React.Dispatch<SetStateAction<number>>;
}

export default function TopupForm({ nominal, setNominal }: TopupFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useAuth();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${api}/topup`,
        { top_up_amount: nominal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Top up berhasil");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? "Terjadi kesalahan");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6 w-full">
      <div className="relative">
        <Banknote className="absolute top-1.5 left-1 text-gray-300" />
        <Input
          disabled={isLoading}
          type={"number"}
          placeholder="masukkan email anda..."
          className="pl-8"
          value={nominal}
          onChange={(e) => setNominal(e.target.valueAsNumber)}
        />
      </div>
      <ConfirmDialog variant="topup" nominal={nominal} onConfirm={onSubmit} />
    </form>
  );
}