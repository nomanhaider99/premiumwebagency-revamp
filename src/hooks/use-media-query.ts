"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a media query reactively.
 *
 * Subscribed through `useSyncExternalStore` for the same reason
 * `usePrefersReducedMotion` is: the query *is* an external store, so reading
 * it this way gets the right answer on the first client render rather than
 * after a second one. Only reach for this when a breakpoint has to reach
 * JavaScript — anything CSS can answer belongs in a Tailwind variant.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}
