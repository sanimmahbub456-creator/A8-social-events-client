import type { Metadata } from "next";
import ThemeProvider from "@/providers/ThemeProvider";
import Providers from "@/providers/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "HandsTogether | Social Development Events Platform",
  description:
    "Discover, create, and join local social-service events — clothes drives, plantation days, cleanups, and more.",
};

// Runs before React hydrates so the correct theme is painted immediately
// (no flash of the wrong theme on load or reload).
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'communityDark' : 'communityLight');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-base-200">
        <ThemeProvider>
          <Providers>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
