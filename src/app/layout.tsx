import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { RegisterSW } from "@/components/RegisterSW";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "FRM Practice", template: "%s · FRM Practice" },
  description: "FRM Part I practice questions, scored on this device.",
  applicationName: "FRM Practice",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "FRM Practice", statusBarStyle: "black-translucent" },
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9eaec" },
    { media: "(prefers-color-scheme: dark)", color: "#141517" },
  ],
};

const themeScript = `try{var t=localStorage.getItem("frm-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SiteHeader />
        <main className="wrap">{children}</main>
        <RegisterSW />
      </body>
    </html>
  );
}
