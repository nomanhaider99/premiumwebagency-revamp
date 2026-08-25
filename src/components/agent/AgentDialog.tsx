"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog, Tabs } from "radix-ui";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Sparkles, UserRound, X } from "lucide-react";
import AgentOrb from "@/components/agent/AgentOrb";
import AgentChat, {
  openingThread,
  type Message,
} from "@/components/agent/AgentChat";
import HumanPanel from "@/components/agent/HumanPanel";
import { SITE } from "@/data/site";

/**
 * The two-tab concierge: our AI agent, or a person.
 *
 * Built on Radix's Dialog and Tabs for the same reason the contact dialog is —
 * focus trapping, Escape, scroll lock, roving tab focus and the correct ARIA
 * wiring are all easy to write badly and hard to notice are wrong.
 *
 * Both panels are `forceMount`ed. Switching to the human tab and back must not
 * throw away the conversation, and a half-typed enquiry must survive a glance
 * at the agent — a tab strip that quietly loses your work is worse than no
 * tabs at all.
 */

type Tab = "agent" | "human";

type AgentDialogValue = {
  isOpen: boolean;
  open: (options?: { seed?: string; tab?: Tab }) => void;
  close: () => void;
};

const AgentDialogContext = createContext<AgentDialogValue | null>(null);

/** Opens the agent dialog from anywhere under the provider. */
export function useAgentDialog(): AgentDialogValue {
  const ctx = useContext(AgentDialogContext);
  if (!ctx) {
    throw new Error("useAgentDialog must be used inside AgentDialogProvider");
  }
  return ctx;
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "agent", label: "AI Agent", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "human", label: "Talk to a human", icon: <UserRound className="h-3.5 w-3.5" /> },
];

export default function AgentDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const still = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("agent");
  const [seed, setSeed] = useState<string | undefined>(undefined);
  /** the conversation lives up here so closing the dialog does not erase it */
  const [messages, setMessages] = useState<Message[]>(openingThread);
  /** bumped to remount the chat on reset, which also cancels a pending reply */
  const [threadKey, setThreadKey] = useState(0);
  /** whatever had focus when the dialog opened, so it can be handed back */
  const opener = useRef<HTMLElement | null>(null);

  const value = useMemo<AgentDialogValue>(
    () => ({
      isOpen,
      open: (options) => {
        opener.current = document.activeElement as HTMLElement | null;
        setTab(options?.tab ?? "agent");
        // assigned unconditionally: leaving the last seed in place would have
        // the next plain open re-ask a question nobody asked for
        setSeed(options?.seed);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  const onOpenChange = useCallback((next: boolean) => setIsOpen(next), []);

  return (
    <AgentDialogContext.Provider value={value}>
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
            onCloseAutoFocus={(event) => {
              const back = opener.current;
              if (!back || !document.body.contains(back)) return;
              event.preventDefault();
              back.focus();
            }}
            className="glass-card fixed left-1/2 top-1/2 z-[95] flex h-[min(40rem,88dvh)] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden p-0 duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            style={{
              // glass over a blurred page is not opaque enough to read a
              // conversation on: the panel needs a ground of its own
              background:
                "color-mix(in srgb, var(--surface-solid) 94%, transparent)",
            }}
          >
            {/* header */}
            <div className="relative shrink-0 border-b border-[color:var(--border)] px-5 pb-4 pt-5 sm:px-6">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 100% at 18% 0%, color-mix(in srgb, var(--signal) 14%, transparent), transparent 70%), radial-gradient(50% 100% at 82% 0%, color-mix(in srgb, var(--circuit) 16%, transparent), transparent 72%)",
                }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AgentOrb size={40} />
                  <div>
                    <Dialog.Title className="text-[1.05rem] leading-tight">
                      {SITE.name} Agent
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                      <span
                        aria-hidden
                        className="status-dot h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--signal)" }}
                      />
                      Online · answers instantly
                    </Dialog.Description>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {/* only worth offering once there is something to clear */}
                  {tab === "agent" && messages.length > 1 && (
                    <button
                      type="button"
                      title="Start a new conversation"
                      aria-label="Start a new conversation"
                      onClick={() => {
                        setSeed(undefined);
                        setMessages(openingThread());
                        setThreadKey((k) => k + 1);
                      }}
                      className="glass-quiet flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text-muted)] transition-colors hover:border-[color:var(--border-strong)] hover:text-[color:var(--text)]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  )}

                  <Dialog.Close
                    aria-label="Close"
                    className="glass-quiet flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text)] transition-colors hover:border-[color:var(--border-strong)]"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>
              </div>
            </div>

            <Tabs.Root
              value={tab}
              onValueChange={(next) => setTab(next as Tab)}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* the segmented control: one lit pill slides between the two */}
              <div className="shrink-0 px-5 pt-4 sm:px-6">
                <Tabs.List
                  aria-label="How would you like to talk to us?"
                  className="glass-quiet grid grid-cols-2 gap-1 rounded-full p-1"
                >
                  {TABS.map((t) => (
                    <Tabs.Trigger
                      key={t.id}
                      value={t.id}
                      className="relative flex h-9 items-center justify-center gap-2 rounded-full text-[12.5px] font-medium text-[color:var(--text-muted)] transition-colors data-[state=active]:text-[#04100c]"
                    >
                      {tab === t.id && (
                        <motion.span
                          layoutId="agent-tab-pill"
                          aria-hidden
                          className="absolute inset-0 rounded-full shadow-[0_4px_18px_var(--glow)]"
                          style={{
                            background:
                              "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
                          }}
                          transition={
                            still
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 400, damping: 34 }
                          }
                        />
                      )}
                      <span className="relative flex items-center gap-2">
                        {t.icon}
                        {t.label}
                      </span>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </div>

              <Tabs.Content
                value="agent"
                forceMount
                className="mt-1 min-h-0 flex-1 flex-col outline-none data-[state=active]:flex data-[state=inactive]:hidden"
              >
                <AgentChat
                  key={threadKey}
                  messages={messages}
                  setMessages={setMessages}
                  seed={seed}
                  onHandoff={() => setTab("human")}
                />
              </Tabs.Content>

              <Tabs.Content
                value="human"
                forceMount
                className="mt-1 min-h-0 flex-1 flex-col outline-none data-[state=active]:flex data-[state=inactive]:hidden"
              >
                <HumanPanel />
              </Tabs.Content>
            </Tabs.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </AgentDialogContext.Provider>
  );
}
