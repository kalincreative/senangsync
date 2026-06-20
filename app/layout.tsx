import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SenangSync — Business OS untuk Malaysian SME",
  description:
    "Dokumen, link, langganan, dan produk bisnes kau — semuanya dalam satu tempat. SenangSync adalah Business Operating System untuk SME Malaysia.",
  keywords: ["SME Malaysia", "business OS", "dokumen bisnes", "langganan tracker", "product catalog"],
  authors: [{ name: "SenangSync" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SenangSync",
  },
  openGraph: {
    title: "SenangSync — Business OS untuk Malaysian SME",
    description: "Semua dalam satu tempat. Cari dalam saat.",
    type: "website",
    locale: "ms_MY",
  },
};

export const viewport: Viewport = {
  themeColor: "#CC0001",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
