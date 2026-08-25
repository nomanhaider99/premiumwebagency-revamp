"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, UserRound } from "lucide-react";
import AgentOrb from "@/components/agent/AgentOrb";
import { GREETING, STARTER_PROMPTS, reply, type AgentReply } from "@/lib/agent-brain";

export type Message = {
  id: number;
  role: "agent" | "user";
  text: string;
  chips?: string[];
  handoff?: boolean;
};

/**
 * A fresh thread. The conversation is owned by the provider rather than by
 * this component: the dialog unmounts its contents when it closes, and coming
 * back to a conversation that has forgotten you is a small betrayal.
 */
export const openingThread = (): Message[] => [
  { id: 0, role: "agent", text: GREETING, chips: STARTER_PROMPTS },
];

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;

/**
 * Bold is the only markup the answers use, so the renderer understands exactly
 * that and nothing else. Pulling in a markdown library to serve `**` would be
 * several kilobytes to render one delimiter.
 */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block min-h-[0.4em]">
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold text-[color:var(--text)]">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </span>
      ))}
    </>
  );
}

/** three dots that stand in for the answer while it is being composed */
function Thinking() {
  return (
    <span className="inline-flex items-center gap-1.5 py-1" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="agent-dot h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--signal)",
            animationDelay: `${i * 140}ms`,
          }}
        />
      ))}
    </span>
  );
}

/**
 * The conversation itself.
 *
 * Answers come from `agent-brain`, on a short delay that scales with length —
 * an instant wall of text reads as a canned response, and a fixed delay reads
 * as a spinner. The wait is capped so it never becomes a cost.
 */
const append = (prev: Message[], message: Omit<Message, "id">): Message[] => [
  ...prev,
  { ...message, id: prev.reduce((max, m) => Math.max(max, m.id), 0) + 1 },
];

export default function AgentChat({
  messages,
  setMessages,
  seed,
  onHandoff,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  /** a question to ask on open, sent from the hero's suggestion chips */
  seed?: string;
  /** switch the dialog to the human tab */
  onHandoff: () => void;
}) {
  const still = useReducedMotion();
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);

  const timer = useRef<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      setMessages((prev) => append(prev, { role: "user", text }));
      setDraft("");
      setThinking(true);

      const answer: AgentReply = reply(text);
      // long answers earn a longer beat; short ones come back almost at once
      const wait = Math.min(1200, 420 + answer.text.length * 1.4);

      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setThinking(false);
        setMessages((prev) => append(prev, { role: "agent", ...answer }));
      }, wait);
    },
    [setMessages]
  );

  /* Closing the dialog mid-answer cancels the pending reply, so a restored
     thread can come back with a question left hanging. Answer it on the way
     in — before the seed effect below, which would otherwise have this one
     answering the question it just asked twice over. */
  useEffect(() => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role !== "user") return prev;
      return append(prev, { role: "agent", ...reply(last.text) });
    });
    // deliberately mount-only: during a session this is what `send` is for
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* a question carried in from the hero is asked as if it had been typed */
  const asked = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!seed || asked.current === seed) return;
    asked.current = seed;
    send(seed);
  }, [seed, send]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  /* keep the newest turn in view — instantly on the first paint, smoothly after */
  const settled = useRef(false);
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: settled.current && !still ? "smooth" : "auto",
    });
    settled.current = true;
  }, [messages, thinking, still]);

  /* the textarea grows with the draft rather than scrolling inside itself */
  useEffect(() => {
    const el = input.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [draft]);

  const last = messages[messages.length - 1];
  const showChips = !thinking && last?.role === "agent";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={scroller}
        className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6"
      >
        <div
          role="log"
          aria-live="polite"
          aria-label="Conversation with the AI agent"
          className="flex flex-col gap-4"
        >
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING}
              className={`flex items-start gap-2.5 ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {m.role === "agent" ? (
                <AgentOrb size={28} className="mt-0.5" />
              ) : (
                <span className="glass-quiet mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                  <UserRound className="h-3.5 w-3.5 text-[color:var(--text-muted)]" />
                </span>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                  m.role === "user"
                    ? "rounded-tr-sm text-[#04100c]"
                    : "glass-quiet rounded-tl-sm text-[color:var(--text-muted)]"
                }`}
                style={
                  m.role === "user"
                    ? {
                        background:
                          "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
                      }
                    : undefined
                }
              >
                <Rich text={m.text} />
              </div>
            </motion.div>
          ))}

          {thinking && (
            <motion.div
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING}
              className="flex items-start gap-2.5"
            >
              <AgentOrb size={28} thinking className="mt-0.5" />
              <div className="glass-quiet rounded-2xl rounded-tl-sm px-4 py-3">
                <Thinking />
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {showChips && (last.chips?.length || last.handoff) && (
              <motion.div
                initial={still ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={SPRING}
                className="flex flex-wrap gap-2 pl-[38px]"
              >
                {last.chips?.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => send(chip)}
                    className="glass-quiet rounded-full px-3.5 py-2 text-left text-[12px] text-[color:var(--text-muted)] transition-colors hover:border-[color:var(--border-strong)] hover:text-[color:var(--text)]"
                  >
                    {chip}
                  </button>
                ))}

                {last.handoff && (
                  <button
                    type="button"
                    onClick={onHandoff}
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-medium text-[#04100c] shadow-[0_4px_18px_var(--glow)] transition-shadow hover:shadow-[0_8px_26px_color-mix(in_srgb,var(--signal)_36%,transparent)]"
                    style={{
                      background:
                        "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
                    }}
                  >
                    <UserRound className="h-3.5 w-3.5" />
                    Talk to a human
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="shrink-0 border-t border-[color:var(--border)] px-5 py-4 sm:px-6"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-deep)] p-2 pl-4 transition-colors focus-within:border-[color:var(--signal)]">
          <label htmlFor="agent-input" className="sr-only">
            Message the AI agent
          </label>
          <textarea
            id="agent-input"
            ref={input}
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              // Enter sends, Shift+Enter breaks the line — the convention
              // every chat surface uses, and the one people try first
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
            placeholder="Ask about scope, pricing, timelines…"
            className="max-h-[120px] flex-1 resize-none bg-transparent py-2 text-[13.5px] leading-relaxed text-[color:var(--text)] outline-none placeholder:text-[color:var(--text-muted)]"
          />
          <motion.button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Send message"
            whileHover={still ? undefined : { scale: 1.06 }}
            whileTap={still ? undefined : { scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#04100c] shadow-[0_4px_16px_var(--glow)] transition-opacity disabled:opacity-35"
            style={{
              background:
                "linear-gradient(100deg, var(--signal), color-mix(in srgb, var(--circuit) 55%, var(--signal)))",
            }}
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
          </motion.button>
        </div>

        <p className="mt-2.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
          AI answers · a human confirms anything that matters
        </p>
      </form>
    </div>
  );
}
