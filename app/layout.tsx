import type { Metadata, Viewport } from "next";
import "./globals.css";
import WelcomePopupWrapper from "./components/WelcomePopupWrapper";

export const metadata: Metadata = {
  title: "GECK",
  description: "Plug in. Type less. Ship faster.",
  openGraph: {
    title: "GECK",
    description: "Plug in. Type less. Ship faster.",
    images: ["/favicon.ico"],
  },
  icons: { icon: "/favicon.ico" },
  twitter: {
    card: "summary_large_image",
    title: "GECK",
    description: "Plug in. Type less. Ship faster.",
    images: ["/favicon.ico"],
  },
  metadataBase: new URL("https://geck.ai"),
  alternates: {
    canonical: "https://geck.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification=1234567890",
  },
  applicationName: "GECK",
  authors: [{ name: "GECK", url: "https://geck.ai" }],
  creator: "GECK",
  publisher: "GECK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <WelcomePopupWrapper />
        <div>{children}</div>
      </body>
    </html>
  );
}
