import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateWIB(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("id-ID", { month: "long" });
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}.${minutes} WIB`;
}