import Logo from "@/components/atoms/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Status = "idle" | "loading" | "success" | "error";
type Variant = "topup" | "service";

interface ConfirmDialogProps {
  nominal: number;
  variant: Variant;
  onConfirm: () => void | Promise<void>;
  statusText?: Record<Status, string>;
}

const topupStatusText: Record<Status, string> = {
  idle: "Anda yakin untuk Top Up sebesar",
  success: "Top Up sebesar",
  error: "Top Up sebesar",
  loading: "Memproses...",
};

export default function ConfirmDialog({
  nominal,
  variant,
  statusText = topupStatusText,
  onConfirm,
}: ConfirmDialogProps) {
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

  let isDisabled: boolean = false;
  if (variant === "topup") {
    isDisabled = nominal < 10000 || nominal > 1000000;
  }

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
          ) : variant === "topup" ? (
            "Top Up"
          ) : (
            "Bayar"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
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
              Ya, lanjutkan {variant === "topup" ? "Top Up" : "Bayar"}
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
}
