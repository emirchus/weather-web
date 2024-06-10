import { Bricolage_Grotesque as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const apiKey: string = process.env.NEXT_PUBLIC_API_KEY;

export const vercel_url: string = process.env.NEXT_PUBLIC_VERCEL_URL;

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
