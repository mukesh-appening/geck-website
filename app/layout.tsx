import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GECK",
  description: "Plug in. Type less. Ship faster.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div>{children}</div>
      </body>
    </html>
  );
}
