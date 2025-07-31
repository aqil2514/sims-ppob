import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultImage } from "@/variables/default-images";
import { useState } from "react";

interface GreetingsCardProps {
  avatarUrl?: string;
  name?: string;
}

export default function GreetingsCard({
  avatarUrl = "",
  name = "",
}: GreetingsCardProps) {
  const isLoading = !avatarUrl || !name;
  const [imgSrc, setImgSrc] = useState<string>(avatarUrl ?? defaultImage);

  return (
    <div className="flex flex-col space-x-4">
      {isLoading ? (
        <Skeleton className="h-14 w-14 rounded-full" />
      ) : (
        <Avatar className="h-14 w-14">
          <AvatarImage src={imgSrc} onError={() => setImgSrc(defaultImage)} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col justify-center">
        <p className="text-sm text-muted-foreground">Selamat Datang,</p>
        {isLoading ? (
          <Skeleton className="h-5 w-36 mt-1 rounded" />
        ) : (
          <p className="text-lg font-semibold leading-snug">{name}</p>
        )}
      </div>
    </div>
  );
}
