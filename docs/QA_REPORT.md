# QA report — 2026-09-06

- `npm run build`: passed (TypeScript and Vite production build).
- Browser render: passed at 390 × 844 mobile, 768 × 1024 tablet, and 1366 × 768 laptop widths with no horizontal overflow.
- Mobile hero typography, single-column reel wall, owner portrait crop, and sticky call/estimate actions are optimized below 720px.
- Surface selector: six distinct images, accessible tab semantics, and animated state transitions present.
- Service explorer: five accessible expanding blocks verified; each exposes a full service page and estimate link.
- The side-by-side rinse comparison was removed per feedback.
- Estimate flow: required contact/location fields, residential/commercial choice, surface sizes, live scope bars, and generated summary verified in browser.
- Bklit bar-chart source is installed from the registry and powers the entered-scope visualization; KokonutUI background paths are adapted to the brand palette with a reduced-motion state.
- Customer-facing copy is direct second person throughout; research and implementation caveats remain internal.
- Reduced motion: global static fallback and Motion hook behavior included.
- `npm run lint`: passed. `npm test`: three content and media-integrity tests passed.
- Browser console: no errors observed during the updated home and services journeys.

Remaining production QA: secure owner approval for public and AI-reframed imagery, run device/network performance profiling, connect and test a real server form, validate owner-approved metadata/structured data, and test the chosen host’s SPA rewrite.
