import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ContactDialogProvider from "@/components/ContactDialog";
import BlobCursor from "@/components/motif/BlobCursor";
import { cn } from "@/lib/utils";

/* Bricolage Grotesque carries every heading — its optical-size axis is what
   keeps the display sizes tight without the small ones going spindly. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

/* Manrope runs the body copy. */
const manrope = Manrope({
  variable: "--font-body-face",
  subsets: ["latin"],
  display: "swap",
});

/* Geist Mono stays on data, badges, nav eyebrows and stat callouts. Neither
   of the two faces above is monospaced, and dropping the mono role is what
   would make the technical labels read as decoration. */
const geistMono = Geist_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Web Agency — Web Design, Development & SEO",
  description:
    "Premium Web Agency crafts high-end websites, custom development, and results-driven marketing & SEO for brands that want to lead their market.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning is required by next-themes: its inline script
    // stamps the class onto <html> before React ever sees the document, which
    // is what stops the flash of the wrong theme on a cold load
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        bricolage.variable,
        manrope.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <ContactDialogProvider>
          <BlobCursor />
          <a
            href="#main"
            className="glass-card sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="relative flex-1">
            {children}
          </main>
          <Footer />
          </ContactDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
