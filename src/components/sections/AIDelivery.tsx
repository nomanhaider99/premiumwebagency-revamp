import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import HexBadge from "@/components/motif/HexBadge";
import PillButton from "@/components/motif/PillButton";
import { ServiceIcon } from "@/lib/service-icons";
import { services } from "@/data/services";

/**
 * Where the reference sells a trading product, this sells the thing that is
 * actually true here: AI shortens delivery. Every line below is lifted from
 * the AI Engineering entry in `data/services` — the description, the feature
 * list, and the FAQ answer about how AI is used on projects that did not buy
 * an AI service. Nothing is invented to fill the slot.
 */
const AI = services.find((s) => s.id === "ai")!;

/** the deliverable types the badge row carries — real service titles */
const DELIVERABLES = ["development", "seo", "ecommerce", "ai"] as const;

export default function AIDelivery() {
  const deliveryFaq = AI.faqs.find((f) =>
    f.question.startsWith("Do you use AI on our project")
  );

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="grid-texture pointer-events-none absolute inset-0 -z-10 opacity-70"
      />
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 -z-10" />

      <div className="container-px grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="AI-accelerated delivery"
            title={
              <>
                AI is how the work{" "}
                <span className="gradient-text">ships faster</span>
              </>
            }
            description={AI.description}
          />

          {deliveryFaq && (
            <Reveal delay={0.06} className="glass-card mt-8 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                {deliveryFaq.question}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed">
                {deliveryFaq.answer}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.1} className="mt-8">
            <PillButton href="/services/ai">Explore AI engineering</PillButton>
          </Reveal>
        </div>

        <div>
          <Reveal stagger className="grid gap-4 sm:grid-cols-2">
            {AI.features.map((feature) => (
              <RevealItem key={feature}>
                <div className="glass-card h-full p-5">
                  <p className="text-[13px] leading-relaxed text-[color:var(--text)]">
                    {feature}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              What that ships as
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {DELIVERABLES.map((id) => {
                const s = services.find((x) => x.id === id)!;
                return (
                  <HexBadge
                    key={id}
                    label={s.title}
                    icon={<ServiceIcon id={id} strokeWidth={1.7} />}
                  />
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
