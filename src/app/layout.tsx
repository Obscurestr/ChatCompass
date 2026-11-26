import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Quicksand } from "next/font/google";
import QuickExit from "../components/QuickExit";
import { APP_NAME } from "../config/app";
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

// Discretion (constitution III): neutral title, not indexed, no referrer sent to other sites.
export const metadata: Metadata = {
  title: APP_NAME,
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#fffcfa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${quicksand.variable} ${atkinson.variable}`}>
      <body className="min-h-dvh">
        <QuickExit />
        {children}
      </body>
    </html>
  );
}
