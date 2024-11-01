import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar/Navbar";
import ClientAnalytics from "@/components/global/ClientAnalytics";
import Container from "@/components/global/Container";
import Footer from "@/components/navbar/Footer";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FPGA Design Services - Cosma Services LLC",
  description: "FPGA Design Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { send_page_view: false });
              `,
            }}
          />
        </head>
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
