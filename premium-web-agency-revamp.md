# Premium Web Agency — Dark/Light AI‑Glass Revamp

*Design + motion brief for the Premium Web Agency site revamp. Reference: attached Destra Network–style screenshot (style/layout reference only — not to be copied literally). Paste this whole file into Claude Code as the working brief.*

## Step 0 — Install the design skill first

Before touching any code, install the UI/UX Pro Max skill so its design-system reasoning engine is active for this session:

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

Optional — use it to cross-check the tokens below (don't let it override them; they're already tuned to the reference screenshot and the existing brand):

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "AI-native web agency, dark glassmorphism, web3" --design-system -p "Premium Web Agency" --persist
```

## 1. What "revamp" means here

- **Content stays.** Before writing a single component, read through the current site's pages/CMS and inventory every section, headline, FAQ entry, nav label, and client name that already exists. Carry all of it over — verbatim, not paraphrased.
- **Only the shell changes:** color/type/surface system, layout chrome, and motion. No invented marketing copy, no rewritten headlines, no placeholder text standing in for real content.
- If a section in the reference image has no real equivalent on the current site (e.g. token-staking), either drop it or re-map it to something the agency actually does — never invent stats, partners, or claims that aren't true.

## 2. What to take from the reference screenshot, what to leave

**Take:** near-black canvas, glass panels, glowing hex/pill badges, a central radiating hub diagram, gradient headline text, pill CTA buttons, accordion FAQ, thin sticky nav with a status pill.

**Leave:** the brand name, logo, token/staking language, and every word of copy — none of that belongs on a web agency's site.

## 3. Design tokens

### Color

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#05080A` | `#F6F9F8` | page canvas |
| `--surface` | `rgba(255,255,255,.04)` | `rgba(255,255,255,.62)` | glass fill |
| `--border` | `rgba(255,255,255,.08)` | `rgba(10,20,18,.08)` | glass edge |
| `--text` | `#EAF6F2` | `#0B1512` | primary text |
| `--text-muted` | `#8CA39B` | `#56655F` | secondary text |
| `--signal` · Signal Teal | `#17F1B0` | `#0FB88A` | CTAs, links, "live" states |
| `--circuit` · Circuit Violet | `#7C5CFC` | `#6A4FE0` | gradients, AI-flagged content |

Teal reads network/decentralized, violet reads AI/intelligence — used together as a gradient pair (never solid) they're the one real signature choice that keeps this from being a straight reskin of the reference.

### Type

Keep **Geist** (display/body) + **Geist Mono** (data, badges, nav eyebrows, stat callouts) — already the agreed direction for this site. The mono face is what makes tech-stack badges and labels feel technical instead of decorative — don't drop it for a single family.

### Surface (glass)

```css
.glass {
  background: var(--surface);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid var(--border);
  border-radius: 20px;
}
```

Two intensities only — `.glass-quiet` (nav, footer, background panels) and `.glass-card` (foreground cards, FAQ rows, add `box-shadow: 0 8px 40px rgba(23,241,176,.08)`). Don't add a third tier; that's how a glass effect turns to mud. Test text contrast over the blur in both themes — if it drops under 4.5:1, add a scrim under the text rather than more blur.

## 4. Theme toggle

Skiper UI's `skiper4` (animated SVG toggle icons, built on Framer Motion + clsx) paired with the `useThemeToggle` hook from `skiper26` (View Transition API):

```
pnpm dlx shadcn add @skiper-ui/skiper4
pnpm dlx shadcn add @skiper-ui/skiper26   # same install pattern as skiper4
```

Preview the five `ThemeToggleButton` variants and pick whichever morphs sun↔moon cleanest against the new palette. Wire it to `useThemeToggle()`, not a raw `useState` — the hook is what actually runs `document.startViewTransition()` for a smooth crossfade instead of an abrupt flash (feature-detect for Safari/Firefox versions without support). Persist the choice to `localStorage` with a `prefers-color-scheme` fallback, and set it before hydration so there's no flash-of-wrong-theme on load.

> Skiper UI's free tier requires a small attribution credit somewhere on the page (footer works) unless you're on Skiper Pro — easy to forget, worth a line in the QA pass.

## 5. AI / blockchain motif library

Used throughout, not confined to the hero:

- **Circuit-line background** — thin animated SVG traces behind the hero and footer; dash-offset drifts slowly so it reads as data flowing, not static wallpaper.
- **Capability hub** — the signature element, see §6.
- **Hex badge** — glass hexagon + icon + label, used for every tech-stack and service chip instead of plain pills.
- **Gradient headline text** — Signal Teal → Circuit Violet, `background-clip: text`, a single subtle position pan on load only. Don't loop it — a shimmering gradient on body text reads as templated AI-slop.
- **Status pill** — small pulsing dot + label in the nav, doing the same job as the reference's "Staking Live Now" but honest: something like "Now booking Q4 projects" — whatever the current availability line already says.
- **Particle/grid texture panel** — dark grid-dot texture behind the AI-workflow feature section (§6).

## 6. Section-by-section plan

| Section | Reference maps to | Treatment |
|---|---|---|
| Nav | top bar | existing links + logo, `.glass-quiet` sticky, theme toggle at the end, status pill before the CTA |
| Hero | headline block | existing headline/subhead unchanged; gradient-text only on the emphasis phrase, not the whole line; existing CTA restyled as a Signal Teal pill with hover glow |
| Capability hub | DGPU diagram | **signature element** — center node = agency mark, radiating hex nodes = real stack (Next.js, WordPress, Shopify, SEO/Content, Plugins, AI-assisted delivery). Connector lines draw on load; nodes float gently (small mirrored y-offset, disabled under reduced-motion) |
| Trusted-by strip | Partnerships | reskin the existing client-logo strip into glass badges if one exists; if not, a natural slot for real, currently-displayable client names (e.g. Cal Dental USA, TranXmedi, AJ Murch Photography, Williams Painting Service — whichever are cleared for public display) |
| Team | founder cards | existing team content, hex-framed photo, glass card |
| AI-accelerated delivery | "Train and use AI faster" | reinterpret honestly — how AI actually speeds up delivery here (faster plugin builds, faster SEO content turnaround), not an invented product. Badge row below = real deliverable types (WordPress Plugins, Custom SEO, Shopify Builds, Next.js Apps) instead of trading-bot models |
| FAQ | accordion | existing Q&A verbatim, glass rows, chevron rotates + height animates via `AnimatePresence` |
| Footer | footer | existing links, `.glass-quiet`, Skiper UI attribution here if on free tier |

## 7. Motion system (Framer Motion)

- **Entrance:** stagger children, fade + `translateY(16px → 0)`, spring `{ stiffness: 120, damping: 20 }` — that's what "smoothness" means here, not longer durations.
- **Scroll reveals:** `whileInView`, `viewport={{ once: true, margin: "-10%" }}` on every section block.
- **Hover:** cards `scale: 1.02` + shadow intensifies; buttons `scale: 1.03` + glow. Nothing rotates or bounces.
- **Hub diagram:** connector lines draw once on load; nodes loop a small y-offset (mirror repeat) — the only continuously-looping motion on the page.
- **Reduced motion:** wrap every loop/parallax effect in a `prefers-reduced-motion` check and fall back to a static state, not just a faster one.
- One orchestrated hero sequence beats fifty scattered micro-animations — restraint here is what keeps this from reading as AI-generated.

## 8. Stack

Next.js + TypeScript, Tailwind, Framer Motion, `skiper26`'s toggle hook (pick one theme mechanism — don't also layer `next-themes` on top of it), shadcn/ui primitives (how Skiper UI ships its components), lucide-react for icons.

## 9. Before calling it done

- [ ] Every piece of copy on the live site still appears, unchanged, somewhere in the new build
- [ ] Both themes pass 4.5:1 text contrast
- [ ] Toggle has no flash-of-wrong-theme on load
- [ ] `prefers-reduced-motion` respected everywhere
- [ ] Keyboard focus visible on nav, toggle, CTAs, FAQ triggers
- [ ] Responsive at 375 / 768 / 1024 / 1440
- [ ] Skiper UI attribution present if on the free tier
