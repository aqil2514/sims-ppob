import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoSize = "sm" | "md" | "lg" | number;

export default function Logo({
  className,
  showText = true,
  size = "md",
}: {
  className?: string;
  showText?: boolean;
  size?: LogoSize;
}) {
  const getSize = (s: LogoSize) => {
    if (typeof s === "number") return { width: s, height: s };
    switch (s) {
      case "sm":
        return { width: 20, height: 20 };
      case "lg":
        return { width: 48, height: 48 };
      case "md":
      default:
        return { width: 24, height: 24 };
    }
  };

  const { width, height } = getSize(size);

  return (
    <div className="flex items-center gap-2 justify-center">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={width}
        height={height}
      />
      {showText && (
        <span className={cn("font-bold text-base", className)}>SIMS PPOB</span>
      )}
    </div>
  );
}
