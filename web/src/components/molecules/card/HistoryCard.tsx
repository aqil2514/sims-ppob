import { TransactionHistory } from "@/@types/data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateWIB } from "@/lib/utils";
import React from "react";

interface HistoryCardProps {
  histories?: TransactionHistory[];
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  isLoadingMore: boolean;
  limit: number;
}

export default function HistoryCard({
  histories,
  setLimit,
  limit,
  isLoadingMore,
}: HistoryCardProps) {
  const skeletonArray = Array.from({ length: limit });

  return (
    <div className="space-y-4">
      <h1 className="font-bold">Semua Transaksi</h1>

      {histories === undefined ? (
        skeletonArray.map((_, i) => <HistoryItemSkeleton key={i} />)
      ) : histories.length === 0 ? (
        <p className="text-sm text-gray-500 text-center block">Maaf tidak ada history transaksi saat ini.</p>
      ) : (
        <>
          {histories.map((history) => (
            <HistoryItem history={history} key={history.invoice_number} />
          ))}
          <Button
            variant={"ghost"}
            className="text-red-500 hover:text-red-600 mx-auto block"
            onClick={() => setLimit((prev) => prev + 5)}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Memuat..." : "Show More"}
          </Button>
        </>
      )}
    </div>
  );
}

const HistoryItem: React.FC<{ history: TransactionHistory }> = ({
  history,
}) => {
  const isPayment = history.transaction_type === "PAYMENT";
  const nominal = history.total_amount.toLocaleString("ID-id");
  const formattedDate = formatDateWIB(history.created_on);

  return (
    <div className="p-4 flex justify-between border border-gray-400 rounded-lg">
      <div>
        <p
          className={`font-bold ${
            isPayment ? "text-red-500" : "text-green-500"
          }`}
        >
          {isPayment ? "-" : "+"} Rp. {nominal}
        </p>
        <p>{formattedDate}</p>
      </div>
      <div>
        <p>{history.description}</p>
      </div>
    </div>
  );
};

const HistoryItemSkeleton = () => {
  return (
    <div className="p-4 flex justify-between border border-gray-400 rounded-lg">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="flex items-start">
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
