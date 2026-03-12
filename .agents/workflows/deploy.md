---
description: Deploy the TapTree application to Vercel production
---

1. **Verify environment variables** are set in the Vercel Dashboard:
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `AUTH_SECRET` — At least 32-character secret (generate: `openssl rand -base64 32`)

2. **Run a local production build** to catch errors early (use the `/build` workflow).

3. **Commit and push** changes to the main branch:
```
git add .
git commit -m "your commit message"
git push origin main
```

4. Vercel will automatically trigger a deployment on push.

5. **Post-deployment verification** — check these endpoints:
   - `/api/health` → should return `{"status": "healthy"}`
   - Homepage loads without errors
   - Sign-up and profile page (`/[handle]`) work correctly

Refer to `DEPLOYMENT.md` for the full production checklist.
