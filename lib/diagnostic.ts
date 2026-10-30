/* Shared validation for the booking form (client and API route). */
export type Booking = {
  name: string; email: string; company: string; role?: string;
  sector?: string; process: string; tried?: string[]; website?: string;
};

export const SECTOR_OPTIONS = ["Finance", "Telecoms", "Logistics", "Marketing", "Other"] as const;
export const TRIED_OPTIONS = ["Spreadsheets", "Off-the-shelf software", "More people", "Nothing yet"] as const;

export function validate(b: Partial<Booking>): Partial<Record<"name" | "email" | "company" | "process", string>> {
  const e: Partial<Record<"name" | "email" | "company" | "process", string>> = {};
  if (!b.name?.trim()) e.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email?.trim() ?? "")) e.email = "Enter a work email, like ada@company.com.";
  if (!b.company?.trim()) e.company = "Tell us where you work.";
  if ((b.process?.trim().length ?? 0) < 12) e.process = "Describe the process in a sentence or two.";
  return e;
}
