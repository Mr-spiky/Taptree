# 🚀 Taptree Production Deployment Checklist

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] **MONGODB_URI** - MongoDB Atlas connection string
  - Create cluster at [MongoDB Atlas](https://cloud.mongodb.com)
  - Use a dedicated database user (not admin)
  - Whitelist `0.0.0.0/0` for Vercel (or use Network Access rules)
  
- [ ] **AUTH_SECRET** - NextAuth.js secret key
  - Generate: `openssl rand -base64 32`
  - Or use: https://generate-secret.vercel.app/32
  - **Must be at least 32 characters**

### 2. Database Setup
- [ ] Create production MongoDB Atlas cluster (M0 Free tier is fine to start)
- [ ] Create database user with read/write permissions
- [ ] Configure Network Access (allow from anywhere for Vercel)
- [ ] Run index creation after first deployment:
  ```bash
  # Indexes are created automatically, but verify via Atlas UI:
  # - users.email_unique
  # - links.handle_unique
  # - links.userId_lookup
  ```

### 3. Vercel Deployment

#### First-Time Setup:
1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in Vercel:
   - `MONGODB_URI` → Your MongoDB Atlas connection string
   - `AUTH_SECRET` → Your generated secret
4. Deploy!

#### Environment Variables in Vercel:
```
Settings → Environment Variables → Add:

MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/taptree
AUTH_SECRET = your-32-character-secret-here
```

### 4. Post-Deployment Verification

After deploying, verify these endpoints:

- [ ] **Health Check**: `https://your-app.vercel.app/api/health`
  - Should return `{"status": "healthy"}`
  
- [ ] **Homepage**: Loads without errors

- [ ] **Sign Up**: Create a test account

- [ ] **Create Taptree**: Verify handle creation works

- [ ] **View Profile**: `https://your-app.vercel.app/testhandle`

---

## Security Checklist

- [x] Password hashing with bcrypt (12 rounds)
- [x] JWT-based sessions (30-day expiry)
- [x] HTTPS only (enforced by Vercel)
- [x] Input validation on all APIs
- [x] URL validation (blocks javascript:, data:, etc.)
- [x] Reserved handles protected
- [x] Owner-only edit enforcement
- [x] Security headers (X-Frame-Options, etc.)

---

## Monitoring

### Health Check Endpoint
```
GET /api/health

Response (200 OK):
{
  "status": "healthy",
  "timestamp": "2026-01-19T10:00:00.000Z",
  "checks": {
    "database": { "status": "healthy", "latencyMs": 45 }
  }
}
```

### Vercel Analytics (Optional)
Enable in Vercel Dashboard → Analytics for:
- Page views
- Web Vitals (Core Web Vitals)
- Function execution times

### Error Tracking (Recommended for Production)
Consider adding Sentry for error tracking:
```bash
npm install @sentry/nextjs
```

---

## Performance Checklist

- [x] Next.js Image optimization enabled
- [x] MongoDB connection pooling
- [x] Database indexes configured
- [x] Static page generation where possible
- [x] Client/Server component split optimized

---

## Common Issues & Solutions

### "MongoDB connection failed"
- Check `MONGODB_URI` is correct
- Verify Network Access allows `0.0.0.0/0` in Atlas
- Check database user credentials

### "AUTH_SECRET must be set"
- Add `AUTH_SECRET` environment variable
- Must be at least 32 characters

### "Handle already taken"
- Each handle must be unique
- Reserved handles (admin, api, etc.) are blocked

---

## Useful Commands

```bash
# Local development
npm run dev

# Production build test
npm run build && npm start

# Check for TypeScript/ESLint errors
npm run lint
```

---

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [NextAuth.js v5 Docs](https://authjs.dev/)
