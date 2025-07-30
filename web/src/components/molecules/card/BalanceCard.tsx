import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface BalanceCardProps {
  balance?: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isLoading = balance === undefined || balance === null;

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className="relative bg-[url(/images/bg-ballance.png)] bg-cover rounded-xl p-6 text-white shadow-md min-h-[120px] flex flex-col justify-between">
      <div>
        <p className="text-sm text-white/80">Saldo Anda</p>

        {isLoading ? (
          <Skeleton className="h-6 w-32 mt-2 bg-white/40 rounded" />
        ) : (
          <p className="text-2xl font-semibold mt-1 tracking-wide">
            {isVisible ? `Rp ${balance.toLocaleString("id-ID")}` : "••••••••"}
          </p>
        )}
      </div>

      <button
        onClick={toggleVisibility}
        className="flex items-center space-x-2 text-sm text-white/80 hover:text-white transition mt-4 self-start"
      >
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        <span>{isVisible ? "Sembunyikan" : "Lihat Saldo"}</span>
      </button>
    </div>
  );
}
