# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Landing Page — Google Business Profile (`artifacts/landing-page`)

Sales page for Google Business Profile optimization services.

### Routes
- `/` — **Home 1**: Clean white design with Google brand colors, 8 sections (Hero, Pain, Education, Service, Proof, Investment, FAQ, CTA)
- `/home2` — **Home 2**: Dark hero with all 10 persuasion triggers (Escassez, Prova Social, Autoridade, Reciprocidade, Ancoragem, Aversão à Perda, Urgência, Pertencimento, Curiosidade, Compromisso)
- `/admin` — **Admin panel**: Password-protected price configuration (default password: `admin123`)

### Key Features
- **IP Geolocation**: Detects visitor city automatically via `ipapi.co/json/`
- **4 Languages**: PT 🇧🇷 · EN 🇺🇸 · ES 🇦🇷 · TH 🇹🇭
- **Shared config**: Prices stored in `localStorage` (`gbp_admin_config`), read by both pages via `src/lib/sharedConfig.ts`
- **PIX key**: `005.173.370-61`
- **Admin configurable**: totalPrice, entryPrice, deliveryPrice, anchorPrice (strikethrough value), admin password

### Config fields (in `src/lib/sharedConfig.ts` DEFAULT_CONFIG)
- `paymentKey`: PIX key
- `whatsapp`: WhatsApp number (no `+` or spaces)
- `salesName`: Name shown in payment modal
- `city`: Fallback city name if IP detection fails

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
