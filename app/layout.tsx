import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "TicketTamer | The AI engine that resolves customer conversations at scale",
  description: "TicketTamer analyzes tickets, predicts intent, decides the next action and automates resolution across chat, voice and email, learning from your knowledge and resolved tickets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
