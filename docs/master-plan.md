# Plan: AI Product Tour SDK (Project "TourAI")

## Objective
Build "The easiest lightweight onboarding SDK" with AI-native tour generation, targeting a <10kb bundle size and exceptional developer experience.

## MVP Features
1. **Tooltip Tour Engine**: Core navigation logic (`start`, `next`, `prev`, `end`).
2. **React SDK**: Easy integration via `<TourProvider>`.
3. **Smart Element Targeting**: Robust CSS selector support.
4. **AI Tour Generation**: Convert DOM/Page descriptions into structured tour steps via OpenAI.
5. **Tiny Bundle**: Aggressive tree-shaking and minimal dependencies.

## Tech Stack
- **Monorepo**: `pnpm` workspaces + `turborepo`.
- **SDK**: TypeScript, `tsup` (bundling), React, `Floating UI` (positioning).
- **AI**: OpenAI API (GPT-4o/GPT-4o-mini).
- **Demo/Docs**: Next.js + Tailwind CSS.

## Project Structure
```text
/
├── packages/
│   ├── sdk/          # Core SDK + React Wrapper
│   └── ai/           # AI Step Generation Logic (Shared)
├── apps/
│   ├── demo/         # Next.js Dashboard Demo
│   └── docs/         # Documentation (Mintlify or Nextra)
├── package.json      # Root workspace config
└── turbo.json        # Pipeline config
```

## Week-by-Week Execution

### Week 1: Core SDK & Foundation
- **Day 1**: Monorepo setup (`pnpm`, `turbo`, `tsup`), initial package structure, and public repo announcement.
- **Day 2-3**: Core Tooltip Engine. Portal rendering, Overlay, and the Tooltip box.
- **Day 4**: Navigation logic (`next`, `prev`, `close`) and state management within `TourProvider`.
- **Day 5**: Advanced Positioning using `Floating UI` (auto-placement, flip, shift).
- **Day 6**: Accessibility (Focus trapping, ARIA labels, Keyboard nav).
- **Day 7**: Styling system (CSS variables for customization) and first Demo App version.

### Week 2: Polish & Performance
- **Transitions**: Smooth animations between steps.
- **Auto-scroll**: Scroll to target element if off-screen.
- **Highlighting**: SVG Mask or simple border highlighting for target elements.
- **Bundle Optimization**: Initial size audit and aggressive tree-shaking.
- **Public Content**: Share bundle size comparisons and "Developer Wins".

### Week 3: AI Engine ("The Wow")
- **Prompt Engineering**: Designing the prompt to convert DOM text/labels into tour steps.
- **API Wrapper**: Simple endpoint to accept page context and return JSON steps.
- **Integration**: `tour.generate({ feature: "dashboard" })` utility.
- **Public Content**: Screen recordings of AI generating a tour in real-time.

### Week 4: Launch Prep
- **Documentation**: Clear installation and usage guides.
- **Landing Page**: One-page site showing the SDK in action.
- **Distribution**: Publish to `npm`, launch on Product Hunt, X, and LinkedIn.

## Verification & Testing
- **Unit Tests**: Vitest for core navigation logic.
- **E2E Tests**: Playwright for cross-browser tooltip positioning.
- **Bundle Audit**: `size-limit` to ensure we stay under 10kb.

## Build in Public Strategy
- **Twitter/X & LinkedIn**: Daily updates on wins (bundle size), struggles (z-index, Safari), and humor.
- **OSS Focus**: MIT License, clean README, "Good First Issue" tags.
