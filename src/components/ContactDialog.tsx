"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import StatusPill from "@/components/motif/StatusPill";
import { SITE } from "@/data/site";

/**
 * The contact form as a dialog, opened from any CTA on the site.
 *
 * Built on Radix's Dialog rather than a hand-rolled overlay: the focus trap,
 * the escape key, the scroll lock, and returning focus to whatever opened it
 * are all things that are easy to write badly and hard to notice are wrong.
 *
 * The motion is driven off Radix's own `data-state` rather than wrapped in an
 * AnimatePresence. Doing it the other way puts a portal between AnimatePresence
 * and the elements it is meant to track, and the dismiss layer stops seeing
 * Escape — a silent trade of real behaviour for an exit animation.
 */

type ContactDialogValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ContactDialogContext = createContext<ContactDialogValue | null>(null);

/** Opens the contact dialog from anywhere under the provider. */
export function useContactDialog(): ContactDialogValue {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) {
    throw new Error("useContactDialog must be used inside ContactDialogProvider");
  }
  return ctx;
}

export default function ContactDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  /** whatever had focus when the dialog opened, so it can be handed back */
  const opener = useRef<HTMLElement | null>(null);

  const value = useMemo<ContactDialogValue>(
    () => ({
      isOpen,
      open: () => {
        opener.current = document.activeElement as HTMLElement | null;
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  const onOpenChange = useCallback((next: boolean) => setIsOpen(next), []);

  return (
    <ContactDialogContext.Provider value={value}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-[90] backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            style={{
              background: "color-mix(in srgb, var(--bg) 72%, transparent)",
            }}
          />

          <Dialog.Content
            // this Radix version does not stamp it itself, and assistive tech
            // uses it to know the rest of the page is inert
            aria-modal="true"
            // Radix's own restore leaves focus on <body> here, and a keyboard
            // user who opens this and closes it should land back on the button
            // they pressed rather than at the top of the document
            onCloseAutoFocus={(event) => {
              const back = opener.current;
              if (!back || !document.body.contains(back)) return;
              event.preventDefault();
              back.focus();
            }}
            className="glass-card fixed left-1/2 top-1/2 z-[95] max-h-[90dvh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-6 duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8"
            style={{
              // the panel needs a solid ground of its own: glass over a blurred
              // page is not opaque enough to read a form on
              background:
                "color-mix(in srgb, var(--surface-solid) 94%, transparent)",
            }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <Dialog.Title className="text-[1.4rem] leading-tight">
                  Start a project
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-[13px] leading-relaxed">
                  Tell us a bit about your project and goals. We&apos;ll get
                  back to you within one business day to schedule an intro call.
                </Dialog.Description>
              </div>

              <Dialog.Close
                aria-label="Close"
                className="glass-quiet flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[color:var(--text)] transition-colors hover:border-[color:var(--border-strong)]"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div className="mt-5">
              <StatusPill>Replies within 1 business day</StatusPill>
            </div>

            <div className="mt-6">
              <ContactForm />
            </div>

            <p className="mt-6 border-t border-[color:var(--border)] pt-5 text-[12px]">
              Prefer email?{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[color:var(--text)] underline underline-offset-4"
              >
                {SITE.email}
              </a>
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ContactDialogContext.Provider>
  );
}
