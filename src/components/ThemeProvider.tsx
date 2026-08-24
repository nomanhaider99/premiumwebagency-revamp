"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/**
 * The single theme mechanism on the site.
 *
 * `next-themes` is not layered on top of anything — skiper26's
 * `useThemeToggle` reads from exactly this provider, so there is one source
 * of truth. Its inline script runs before hydration, which is what prevents
 * the flash of the wrong theme on a cold load, and `disableTransitionOnChange`
 * stops every transitioned property on the page from racing the View
 * Transition crossfade when the toggle fires.
 */
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="pwa-theme"
    >
      {children}
    </NextThemes>
  );
}
