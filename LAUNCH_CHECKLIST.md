# TapTree — Production Launch Checklist

## Environment Variables
- [ ] `MONGODB_URI` — set in Vercel project settings
- [ ] `AUTH_SECRET` — set in Vercel (min 32 chars, generate with `openssl rand -base64 32`)
- [ ] `NEXT_PUBLIC_SITE_URL` — set to your production URL (e.g., `https://taptree.io`)

## MongoDB
- [ ] IP access list includes `0.0.0.0/0` (for Vercel serverless) OR specific Vercel IP ranges
- [ ] Database `taptree` exists with collections: `users`, `links`
- [ ] Indexes created: `users.email` (unique), `links.handle` (unique), `links.userId`

## Deployment
- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes clean
- [ ] Vercel deployment successful
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

## Auth
- [ ] User signup works end-to-end
- [ ] User login works end-to-end
- [ ] Protected routes redirect unauthenticated users to `/login`
- [ ] Authenticated users redirect from `/login` → `/dashboard`
- [ ] Sign out works

## Core Features
- [ ] Create Taptree — handle, links, bio, profile pic
- [ ] Edit Taptree — preserves click counts on existing links
- [ ] Public profile page loads at `/[handle]`
- [ ] Click tracking works on public link buttons
- [ ] Share button copies URL to clipboard

## Security
- [ ] Rate limiting active on `/api/track-click`
- [ ] Password validation: 8+ chars, one letter, one number (client + server aligned)
- [ ] Handle validation: reserved handles blocked, format enforced
- [ ] Ownership checks: users can only edit their own Taptrees
- [ ] CSP header active

## SEO
- [ ] Public profile pages have dynamic OG title, description, and image
- [ ] Twitter card metadata present
- [ ] Each page has a single `<h1>`

## Mobile
- [ ] Landing page responsive
- [ ] Dashboard responsive
- [ ] Public profile responsive
- [ ] Login/signup responsive
- [ ] Mobile nav hamburger works

## Performance
- [ ] Profile images use `next/image` with lazy loading
- [ ] Static assets cached (1 year, immutable)
- [ ] Security headers active (HSTS, CSP, X-Frame-Options)
