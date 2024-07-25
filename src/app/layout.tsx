import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Myntenance",
  description: "Keep track of your personal projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " flex flex-col gap-2"}>
        <Providers>
          <Header />
          <main className="m-auto w-full max-w-[1200px] flex-1 p-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
