import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Bookshop",
  description: "Your favorite online book store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="min-h-[100vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
