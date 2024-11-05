import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar/Navbar";
import ConsentBanner from "@/components/global/ConsentBanner";
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
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              if(localStorage.getItem('consentMode') === null){
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied'
                  }); 
              }else{
                gtag('consent', 'default', JSON.parse(localStorage.getItem('consentMode')));
              }
            `,
            }}
          />

          <script
            async
            src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          ></script>

          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id= ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              gtag('js', new Date());
              gtag('config', ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID});
            `,
            }}
          /> */}

          {/* <script
            async
            src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          ></script> */}
        </head>
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <Container className='py-20'>{children}</Container>
            <ConsentBanner />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
