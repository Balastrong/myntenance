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
    <html lang="en">
      <body className={inter.className + " flex flex-col gap-2"}>
        <Providers>
          <Header />
          <main className="flex-1 p-4 max-w-[1200px] m-auto w-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
