import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * @param args
 * @returns a string of Tailwind classes verifed and merged together using tailwind-merge
 */
export function cn(...args: ClassValue[]): string {
  return twMerge(clsx(...args));
}
