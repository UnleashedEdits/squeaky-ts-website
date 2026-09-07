# Squeaky T’s Pressure Cleaning redesign

Production-buildable React + TypeScript + Tailwind v4 website for Squeaky T’s Pressure Cleaning Service.

```bash
npm install
npm run dev
npm run build
```

The static estimate flow prepares a copy-ready request and direct call handoff. It does not transmit or store leads.

## Production handoff

1. Confirm every item in `docs/OWNER_APPROVAL.md`.
2. Set the owner-controlled canonical origin, sitemap, and structured data.
3. Deploy the `dist/` output to a static host with SPA fallback to `index.html`.
4. Add a validated server endpoint only if online lead submission or uploads are required later.

Rollback by redeploying the previous immutable `dist/` artifact or prior source commit.
