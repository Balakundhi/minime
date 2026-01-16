import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { env } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Charan - Portfolio",
  description:
    "Portfolio of Sri Charan - Software Engineer, Marathon Runner, Traveller, Cook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {turnstileSiteKey ? (
          <>
            <Script id="turnstile-init" strategy="afterInteractive">
              {`window.turnstileInit = function () {
                window.dispatchEvent(new Event("turnstileLoaded"));
              };`}
            </Script>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=turnstileInit"
              strategy="afterInteractive"
            />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
