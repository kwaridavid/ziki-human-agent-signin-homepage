import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ziki — Human and AI collaboration",
    template: "%s · Ziki",
  },
  description:
    "Move issues forward with AI agents while keeping people informed, in control, and part of every important decision.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
