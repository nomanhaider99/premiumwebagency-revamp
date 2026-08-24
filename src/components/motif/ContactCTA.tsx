"use client";

import PillButton from "@/components/motif/PillButton";
import { useContactDialog } from "@/components/ContactDialog";

/**
 * The CTA that opens the contact dialog instead of navigating. Same pill as
 * everywhere else — only the action differs, so the two never drift apart
 * visually.
 */
export default function ContactCTA({
  children = "Start a project",
  tone = "signal",
  className,
}: {
  children?: React.ReactNode;
  tone?: "signal" | "glass";
  className?: string;
}) {
  const { open } = useContactDialog();

  return (
    <PillButton tone={tone} className={className} onClick={open}>
      {children}
    </PillButton>
  );
}
