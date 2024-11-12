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
  title: "FloristAI - Ask Jennie",
  description: "AI-powered flower identification app by Jennie.",
  keywords: ["flowers", "AI", "identification", "Ask Jennie", "florist"],
  openGraph: {
    title: "FloristAI - Ask Jennie",
    description: "Use AI to identify flowers with Jennie, the FloristAI assistant.",
    url: "https://florist-ai-ask-jennie.vercel.app",
    images: [
      {
        url: "/images/og.webp", // replace with the actual path to your image
        width: 1200,
        height: 630,
        alt: "FloristAI",
      },
    ],
    type: "website",
  },
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
