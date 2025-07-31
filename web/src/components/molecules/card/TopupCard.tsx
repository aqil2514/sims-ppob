import { Button } from "@/components/ui/button";
import TopupForm from "../forms/TopupForm";
import React, { SetStateAction, useState } from "react";

export default function TopupCard() {
  const [nominal, setNominal] = useState<number>(0);
  return (
    <div className="space-y-4">
      <p>Silahkan masukkan</p>
      <p className="font-bold text-xl">Nominal Top Up</p>
      <div className="flex justify-between flex-col-reverse md:flex-row gap-4">
        <TopupForm nominal={nominal} setNominal={setNominal} />
        <NominalList setNominal={setNominal} />
      </div>
    </div>
  );
}

const NominalList: React.FC<{
  setNominal: React.Dispatch<SetStateAction<number>>;
}> = ({ setNominal }) => {
  const list = [10000, 20000, 50000, 100000, 250000, 500000];
  return (
    <div className="grid grid-cols-3 gap-4 px-4">
      {list.map((l) => (
        <Button
          variant={"outline"}
          size={"lg"}
          className="active:scale-95"
          key={l}
          onClick={() => setNominal(l)}
        >
          Rp. {l.toLocaleString("ID-id")}
        </Button>
      ))}
    </div>
  );
};
