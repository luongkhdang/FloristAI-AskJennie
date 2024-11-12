import type { Metadata } from "next";
import localFont from "next/font/local";
import SessionLayout from "./SessionLayout"; // Import the client-side SessionLayout
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ask Jennie, the florist.",
  description: "Florist AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionLayout>{children}</SessionLayout> {/* Wrap in SessionLayout */}
      </body>
    </html>
  );
}
