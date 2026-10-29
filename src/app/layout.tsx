import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Free Discount Calculator (Final Price, Extra Discount)",
  description:
    "Calculate final prices, instant rupee savings, and effective percentage for single or stacked discounts (like 50% + 20% off). Fast, mobile-first discount calculator with Indian numbering formatting.",
  keywords: [
    "discount calculator",
    "double discount calculator",
    "50% + 20% off calculator",
    "extra discount calculator",
    "percentage off calculator",
    "sale price calculator",
    "indian rupee discount calculator",
    "reverse discount calculator",
    "find discount percentage",
  ],
  authors: [{ name: "Kunal Builds", url: "https://websitebykunalbuilds.vercel.app" }],
  creator: "Kunal Builds",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "Free Discount Calculator (Final Price, Extra Discount)",
    description:
      "Calculate final price, savings, and effective percentage for single or stacked discounts (like 50% + 20% off). Simple, free, Indian Rupee formatting.",
    siteName: "Discount Calculator by Kunal Builds",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Discount Calculator (Final Price, Extra Discount)",
    description:
      "Calculate final price, savings, and effective percentage for single or stacked discounts (like 50% + 20% off).",
    creator: "@bykunalbuilds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        {/* 
          =======================================================
          GOOGLE ADSENSE SNIPPET PLACEHOLDER
          Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your Google AdSense Publisher ID.
          Uncomment the script tag below when ready to activate AdSense:
          =======================================================
        */}
        {/*
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
        */}
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
