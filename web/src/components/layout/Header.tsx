"use client";

import { headerNav } from "@/variables/header-navigations";
import Logo from "../atoms/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href={"/dashboard"}>
          <Logo />
        </Link>
        <MenuNavbar />
      </div>
    </header>
  );
}

const MenuNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-4">
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
