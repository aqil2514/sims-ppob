"use client";

import { headerNav } from "@/variables/header-navigations";
import Logo from "../atoms/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href={"/dashboard"}>
          <Logo />
        </Link>
        <MenuNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
}

const MenuNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="space-x-4 hidden md:flex">
      {headerNav.map((nav) => (
        <Link
          key={nav.value}
          href={nav.value}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === nav.value
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500"
          )}
        >
          {nav.label}
        </Link>
      ))}
    </nav>
  );
};

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="block md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription></SheetDescription>
          {headerNav.map((nav) => (
            <Link
              key={nav.value}
              href={nav.value}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === nav.value
                  ? "text-red-500"
                  : "text-gray-600 hover:text-red-500"
              )}
            >
              {nav.label}
            </Link>
          ))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
