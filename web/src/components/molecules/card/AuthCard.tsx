import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface AuthCardProps {
  topDescription: string;
  bottomDescription: string;
  Form: React.ReactNode;
  footer: string;
  footerLink: string;
  footerLinkLabel: string;
}

export default function AuthCard({
  footer,
  bottomDescription,
  topDescription,
  footerLink,
  footerLinkLabel,
  Form,
}: AuthCardProps) {
  return (
    <Card className="flex flex-col justify-center items-center w-full h-full">
      <CardHeader className="w-full space-y-4">
        <CardTitle className="flex gap-2 items-center justify-center">
          <Image src={"/images/logo.png"} width={32} height={32} alt="Logo" />{" "}
          SIMS PPOB
        </CardTitle>
        <CardDescription className="text-center text-lg font-bold">
          {topDescription} <br /> {bottomDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full max-w-96">{Form}</CardContent>
      <CardFooter>
        <p className="text-gray-400">
          {footer} <Link href={footerLink} className="text-red-500 font-bold">{footerLinkLabel}</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
