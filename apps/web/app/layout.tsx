import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import pwaAssets from "@/config/pwa-assets.json";
import { PwaServiceWorker } from "@/components/pwa-service-worker";

const pwaAssetVersion = pwaAssets.version;
const pwaAsset = (path: string) => `${path}?v=${pwaAssetVersion}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  applicationName: "Onestack",
  title: {
    default: "Onestack",
    template: "%s | Onestack"
  },
  description: "A mobile-ready workspace for monitoring Polymarket positions.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Onestack",
    statusBarStyle: "black-translucent",
    startupImage: pwaAssets.appleStartupImages.map((image) => ({
      url: pwaAsset(image.src),
      media: image.media
    }))
  },
  formatDetection: {
    telephone: false
  },
  other: {
    "apple-mobile-web-app-capable": "yes"
  },
  icons: {
    icon: [
      { url: pwaAsset("/icons/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: pwaAsset("/icons/icon-192.png"), sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: pwaAsset("/icons/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "Onestack",
    description: "A mobile-ready workspace for monitoring Polymarket positions.",
    siteName: "Onestack",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdf8" },
    { media: "(prefers-color-scheme: dark)", color: "#102d24" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PwaServiceWorker />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
