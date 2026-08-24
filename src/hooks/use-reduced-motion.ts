"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's `prefers-reduced-motion` setting reactively.
 * Returns `true` when the user has requested reduced motion.
 *
 * Subscribed through `useSyncExternalStore` rather than an effect that seeds
 * state: the media query *is* an external store, so reading it this way gets
 * the right answer on the first client render instead of after a second one.
 */
export function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // the server cannot know, and assuming "reduced" would ship a static hero
    // to everyone; the client corrects it on the first render either way
    () => false
  );
}
