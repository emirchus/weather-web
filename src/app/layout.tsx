import type { Metadata } from "next";

import "./globals.css";
import { fontSans } from "@/lib/config";
import { ThemeProvider } from "@/provider/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Inicio",
    template: "%s | Mi Clima",
  },
  description: "",
  authors: [
    {
      name: "emirchus",
      url: "https://emirchus.dev.ar",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <ThemeProvider>
          <div className="flex flex-col md:items-center md:justify-center md:p-5 2xl:max-w-[80%] mx-auto h-screen w-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
