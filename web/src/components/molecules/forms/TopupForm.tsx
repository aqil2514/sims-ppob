import Logo from "@/components/atoms/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/variables/api";
import axios, { isAxiosError } from "axios";
import { Banknote, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";
import { toast } from "sonner";

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
      <ConfirmDialog nominal={nominal} onConfirm={onSubmit} />
    </form>
  );
}

type Status = "idle" | "loading" | "success" | "error";
const ConfirmDialog: React.FC<{
  nominal: number;
  onConfirm: () => void;
}> = ({ nominal, onConfirm }) => {
  const [status, setStatus] = useState<Status>("idle");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleConfirm = async () => {
    setStatus("loading");
    try {
      await onConfirm();
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  const isDisabled = nominal < 10000 || nominal > 1000000;

  const renderStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="animate-spin w-10 h-10 text-blue-500" />;
      case "success":
        return <CheckCircle2 className="text-green-500 w-10 h-10" />;
      case "error":
        return <XCircle className="text-red-500 w-10 h-10" />;
      default:
        return <Logo size={"lg"} showText={false} />;
    }
  };

  const statusText: Record<Status, string> = {
    idle: "Anda yakin untuk Top Up sebesar",
    success: "Top Up sebesar",
    error: "Top Up sebesar",
    loading: "Memproses...",
  };

  const responseText: Record<Status, string> = {
    error: "Gagal",
    idle: "",
    loading: "",
    success: "Berhasil",
  };

  const isBackToHome = status === "success" || status === "error";

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setStatus("idle");
      }}
    >
      <DialogTrigger asChild>
        <Button
          disabled={isDisabled || status === "loading"}
          type="button"
          className="bg-red-500 hover:bg-red-600 w-full"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Memproses...
            </>
          ) : (
            "Top Up"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 flex-col items-center justify-center">
          {renderStatusIcon()}
          <p>{statusText[status]}</p>
          <p className="font-bold">Rp. {nominal.toLocaleString("ID-id")}</p>
          <p>{responseText[status]}</p>

          {status === "idle" && (
            <Button
              variant={"ghost"}
              className="text-red-500 hover:text-red-600"
              type="button"
              disabled={isDisabled}
              onClick={handleConfirm}
            >
              Ya, lanjutkan Top Up
            </Button>
          )}
          {isBackToHome && (
            <Button
              variant={"ghost"}
              className="text-red-500 hover:text-red-600"
              type="button"
              disabled={isDisabled}
              onClick={() => router.push("/dashboard")}
            >
              Kembali ke Beranda
            </Button>
          )}

          <Button
            id="close-dialog-btn"
            type="button"
            variant={"ghost"}
            className="text-gray-500 hover:text-gray-600"
            disabled={status === "loading"}
            onClick={() => {
              setOpen(false);
              setStatus("idle");
            }}
          >
            Batalkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
