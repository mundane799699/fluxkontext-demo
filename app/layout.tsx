import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserButton } from "@/components/UserButton";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { CircleDollarSign } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Flux Context - Online Image Enhance with AI | Free Credits for New Users",
  description:
    "Use Flux Context for online image enhance with AI.Powered by FLUX KONTEXT technology.Free credits for new users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="bg-white z-50 fixed top-0 left-0 right-0 flex justify-between items-center py-3 border-b border-gray-200 h-16 px-4 sm:px-8 lg:pl-12 lg:pr-[calc(3rem+var(--removed-body-scroll-bar-size,0px))]">
          <div className="flex items-center gap-4">
            <Link href="/">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                FluxContext
              </span>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-1 hover:bg-blue-100 rounded-md px-2 py-1"
            >
              <CircleDollarSign className="w-4 h-4" />
              Pricing
            </Link>
          </div>
          <UserButton />
        </header>
        <main className="pt-16 h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
