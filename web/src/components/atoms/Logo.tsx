import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Image src={"/images/logo.png"} width={24} height={24} alt="Logo" />{" "}
      <span className={cn("font-bold", className)}>SIMS PPOB</span>
    </div>
  );
}
