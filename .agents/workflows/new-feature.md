---
description: Workflow for developing and shipping a new feature in TapTree
---

1. **Understand the feature** — clarify requirements and identify which parts of the codebase are affected:
   - `app/` — Next.js pages and API routes
   - `components/` — Reusable UI components
   - `lib/` — Shared utilities, DB models, auth helpers

2. **Plan the change** — determine if you need:
   - A new page or route under `app/`
   - A new API route under `app/api/`
   - A new or updated component in `components/`
   - A schema change in `lib/`

3. **Implement** — follow existing patterns:
   - Use Server Components by default; add `"use client"` only when needed
   - Database access goes through `lib/` helpers, never directly in components
   - Auth checks use the NextAuth session (see existing API routes for patterns)

4. **Lint and type-check** (use the `/lint` workflow).

5. **Build check** (use the `/build` workflow) to ensure no production errors.

6. **Deploy** (use the `/deploy` workflow) once everything passes.
