"use client";

import { headerNav } from "@/variables/header-navigations";
import Logo from "../atoms/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // pastikan ada utility cn untuk class merge

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Logo />
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
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          )}
        >
          {nav.label}
        </Link>
      ))}
    </nav>
  );
};
