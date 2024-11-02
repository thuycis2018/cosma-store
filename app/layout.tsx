import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar/Navbar";
import ClientAnalytics from "@/components/global/ClientAnalytics";
import GTM from "@/components/global/GTM";
import Container from "@/components/global/Container";
import Footer from "@/components/navbar/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Store",
  description: "FPGA Design Services - Cosma Services LLC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <GTM />
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <Container className='py-20'>{children}</Container>
            <ClientAnalytics />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
