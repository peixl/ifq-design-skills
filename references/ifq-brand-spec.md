# ifq.ai · Brand Spec (Built-in)

> This is the first-class brand spec for the **IFQ Design Skills** itself.
> When a user invokes the skill without supplying their own brand, all produced
> artifacts default to carrying a subtle ifq.ai signature: sparkle spark, rust
> accent, editorial serif pairing, and a corner watermark on long-form output.
>
> This is **not** an override of the user's brand. When the user specifies a
> brand (Stripe, Linear, the user's own company), the **核心资产协议 / Core
> Asset Protocol** in SKILL.md wins — user brand is primary, ifq.ai drops to
> a discreet "made with ifq.ai" stamp in the colophon only.

## 🎯 Core assets

### Logo
- Primary:    `assets/ifq-brand/logo.svg`         (light backgrounds)
- Reverse:    `assets/ifq-brand/logo-white.svg`   (dark backgrounds)
- Monogram:   `assets/ifq-brand/mark.svg`         (favicon / app icon base)

### Sparkle glyph (signature)
The 8-point sparkle is the ifq.ai identity anchor. Use it:
- As a subtle element over the "i" dot in wordmark
- As an animated hero element (see `IfqSpark` in `ifq_brand.jsx`)
- As a loader / transition marker

### Hand-drawn icon pack
- Sprite: `assets/ifq-brand/icons/hand-drawn-icons.svg` — 24 icons, viewBox 24×24
- ID list:
  `spark, brush, pencil, frame, layers, play, record, film, deck, grid,
   palette, eyedropper, type, serif, cursor, hand, sparkles, radar, compass,
   idea, rocket, check, link, arrow`
- Style: 1.8px stroke, slightly jittered coordinates, rounded caps/joins.
- Usage: `<use href="assets/ifq-brand/icons/hand-drawn-icons.svg#i-spark"/>`

## 🎨 Color tokens

```css
:root {
  /* Accents */
  --ifq-accent:       #D4532B;   /* primary rust */
  --ifq-accent-deep:  #A83518;
  --ifq-accent-soft:  #FFB27A;

  /* Neutrals */
  --ifq-ink:          #111111;   /* body / display on light */
  --ifq-ink-soft:     #3A3532;
  --ifq-paper:        #FAF7F2;   /* warm paper-white */
  --ifq-cream:        #F1EBE0;
  --ifq-shadow:       rgba(17,17,17,0.08);
}
```

## ✒️ Typography

- **Display**: Newsreader / Source Serif Pro / Noto Serif SC — editorial, slightly
  warm, must read as "considered", never Inter-at-display-size.
- **Body**: `-apple-system`, BlinkMacSystemFont, Inter — system-trusted for
  density and screen clarity.
- **Mono (HUD / data / stamps)**: JetBrains Mono, SF Mono, ui-monospace.

Hierarchy rule: Display at ≥40px only; never use Display for <20px body.

## 🫴 Signature details (120% points)

- **Rust accent vertical rule** (3px) on editorial pages — inherited from
  Pentagram-style information architecture.
- **Text-wrap: pretty** on all headings and pull-quotes.
- Chinese quotes use 「」 not "".
- Numbers in mono with tabular-nums on data pages.

## 🚫 Forbidden

- Purple gradients (AI slop signature).
- Emoji as icon — use hand-drawn pack instead.
- SVG-drawn faces / illustrations — use real images or nano-banana-pro.
- Inter at display size without brand sign-off.

## 📎 Placement rules for ifq.ai signature on deliverables

| Deliverable type | Default placement | Override |
|------------------|-------------------|----------|
| iOS / App prototype | `IfqWatermark` bottom-right, opacity 0.35, `mixBlendMode: multiply` | Remove if delivering to end-user as client mockup |
| HTML slides | `IfqStamp` on title slide + closing slide only | n/a |
| Motion / video | Sparkle reveal at intro (8–12 frames) + mark in outro | Remove for client branded pieces |
| Infographic | "Designed with ifq.ai" colophon bottom-left, 11px mono | n/a |
| Hero / landing | Full `IfqLogo` in header, rust accent vertical rule | n/a |

**Rule of thumb**: ifq.ai mark is present but never compete with the subject.
It is a signature, not a poster.
