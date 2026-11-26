import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Quicksand } from "next/font/google";
import "./globals.css";

// Display + labels: rounded, friendly; variable weight (we use 600–700).
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Body/UI: variable weight; we use 400 and 700.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  // Next has no metric overrides for this font yet; fall back to system UI fonts.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Neutral title and noindex are finished in T013.
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Notes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${quicksand.variable} ${atkinson.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
