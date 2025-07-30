import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function MainContainer({
  children,
  className,
  ...props
}: MainContainerProps) {
  return (
    <div className={cn("min-h-screen w-full bg-gray-50", className)} {...props}>
      {children}
    </div>
  );
}
