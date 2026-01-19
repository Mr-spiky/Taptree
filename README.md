# 🌳 Taptree

A modern, self-hosted Linktree alternative built with Next.js 16, featuring user authentication, custom handles, and a beautiful UI.

## ✨ Features

- 🔐 Secure authentication (email/password with bcrypt)
- 🎨 Beautiful, responsive UI with Tailwind CSS v4
- 🔗 Create custom link pages with unique handles
- ✏️ Owner-only edit mode
- 🛡️ Production-ready security (input validation, XSS protection)
- 📱 Mobile-first design
- ⚡ Optimized performance with Next.js App Router

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB database (local or [MongoDB Atlas](https://cloud.mongodb.com))

### Installation

1. **Clone and install:**
   ```bash
   git clone <your-repo>
   cd taptree
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taptree
   AUTH_SECRET=your-32-character-secret-here
   ```

3. **Initialize database (optional):**
   ```bash
   npm run db:init
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:init` | Initialize database indexes |

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB
- **Auth:** NextAuth.js v5 (credentials provider)
- **Deployment:** Vercel-ready

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `MONGODB_URI`
   - `AUTH_SECRET`
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide.

## 📁 Project Structure

```
├── app/
│   ├── api/           # API routes
│   │   ├── add/       # Create taptree
│   │   ├── auth/      # Auth endpoints
│   │   ├── health/    # Health check
│   │   └── [handle]/  # Edit taptree
│   ├── [handle]/      # Public profile pages
│   ├── generate/      # Create new taptree page
│   └── ...
├── components/        # React components
├── lib/              # Utilities
│   ├── auth.js       # NextAuth config
│   ├── mongodb.js    # Database connection
│   ├── security.js   # Security utilities
│   └── logger.js     # Logging utilities
└── scripts/          # CLI scripts
```

## 🔒 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT sessions with 30-day expiry
- Input validation on all endpoints
- URL sanitization (blocks javascript:, data:, etc.)
- Reserved handles protection
- HTTPS enforced in production

## 📄 License

MIT
