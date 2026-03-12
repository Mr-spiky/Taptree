// ─── Plan Cards ───────────────────────────────────────────────
export const plans = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: "free forever",
    tagline: "For creators just getting started",
    cta: "Join for free",
    ctaVariant: "outline",
    featured: false,
    highlights: [
      "Unlimited links",
      "Add a Taptree to your socials",
      "Basic customization",
      "QR code generator",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 5,
    yearlyPrice: 4,
    period: "/month",
    tagline: "More customization for growing creators",
    cta: "Get Starter",
    ctaVariant: "outline",
    featured: false,
    highlights: [
      "Everything in Free",
      "Advanced themes & fonts",
      "Scheduled links",
      "Priority email support",
      "Social preview cards",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 9,
    yearlyPrice: 7,
    period: "/month",
    tagline: "Best for serious creators and growing teams",
    cta: "Get Pro",
    ctaVariant: "primary",
    featured: true,
    badge: "Best value",
    highlights: [
      "Everything in Starter",
      "Advanced analytics & insights",
      "Remove Taptree branding",
      "Custom domain support",
      "Email & SMS collection",
      "A/B link testing",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 24,
    yearlyPrice: 19,
    period: "/month",
    tagline: "Built for agencies, brands, and teams scaling fast",
    cta: "Get Premium",
    ctaVariant: "outline",
    featured: false,
    highlights: [
      "Everything in Pro",
      "Team seats & role permissions",
      "API access",
      "Client workspaces",
      "Dedicated success manager",
      "SSO & advanced security",
    ],
  },
];

// ─── Trust Brands ─────────────────────────────────────────────
export const trustedBrands = [
  "NBA", "TIME", "YouTube", "Spotify", "HBO", "SONY",
];

// ─── Growth Steps ─────────────────────────────────────────────
export const growthSteps = [
  {
    step: "01",
    title: "Create a creator or brand account",
    description:
      "Sign up in seconds — no credit card needed. Pick your unique handle and you're live.",
    icon: "user-plus",
  },
  {
    step: "02",
    title: "Set up your Taptree",
    description:
      "Add links, embeds, storefronts, and media. Customize themes, colors, and fonts to match your brand.",
    icon: "palette",
  },
  {
    step: "03",
    title: "Get insights & grow",
    description:
      "Track clicks, audience demographics, and conversions. Optimize your bio link with real data.",
    icon: "chart",
  },
];

// ─── Earn More ────────────────────────────────────────────────
export const earnTabs = [
  {
    id: "payments",
    label: "Direct payments",
    rows: [
      { feature: "Tip jar / donations", free: false, starter: true, pro: true, premium: true },
      { feature: "Pay-per-click links", free: false, starter: false, pro: true, premium: true },
      { feature: "Subscription gates", free: false, starter: false, pro: true, premium: true },
      { feature: "Revenue dashboard", free: false, starter: false, pro: true, premium: true },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce integrations",
    rows: [
      { feature: "Shopify integration", free: false, starter: true, pro: true, premium: true },
      { feature: "Product embeds", free: false, starter: false, pro: true, premium: true },
      { feature: "Affiliate link tracking", free: false, starter: false, pro: true, premium: true },
      { feature: "Order notifications", free: false, starter: false, pro: false, premium: true },
    ],
  },
  {
    id: "tips",
    label: "Tip & donation jars",
    rows: [
      { feature: "One-time tips", free: false, starter: true, pro: true, premium: true },
      { feature: "Recurring support", free: false, starter: false, pro: true, premium: true },
      { feature: "Goal thermometers", free: false, starter: false, pro: true, premium: true },
      { feature: "Thank-you redirects", free: false, starter: false, pro: false, premium: true },
    ],
  },
];

// ─── Full Feature Comparison ──────────────────────────────────
export const featureCategories = [
  {
    category: "Linking",
    rows: [
      { feature: "Unlimited links", free: true, starter: true, pro: true, premium: true },
      { feature: "Link scheduling", free: false, starter: true, pro: true, premium: true },
      { feature: "Link thumbnails", free: false, starter: true, pro: true, premium: true },
      { feature: "Spotlight links", free: false, starter: false, pro: true, premium: true },
      { feature: "Sensitive content warnings", free: true, starter: true, pro: true, premium: true },
      { feature: "Link redirects", free: false, starter: false, pro: true, premium: true },
    ],
  },
  {
    category: "Customization",
    rows: [
      { feature: "Profile image & bio", free: true, starter: true, pro: true, premium: true },
      { feature: "Basic themes", free: true, starter: true, pro: true, premium: true },
      { feature: "Animated themes", free: false, starter: true, pro: true, premium: true },
      { feature: "Custom fonts", free: false, starter: true, pro: true, premium: true },
      { feature: "Custom backgrounds", free: false, starter: false, pro: true, premium: true },
      { feature: "Custom button styles", free: false, starter: false, pro: true, premium: true },
      { feature: "Remove Taptree logo", free: false, starter: false, pro: true, premium: true },
      { feature: "Custom CSS (advanced)", free: false, starter: false, pro: false, premium: true },
    ],
  },
  {
    category: "Analytics & insights",
    rows: [
      { feature: "Lifetime click counts", free: true, starter: true, pro: true, premium: true },
      { feature: "Daily / weekly breakdown", free: false, starter: true, pro: true, premium: true },
      { feature: "Referrer tracking", free: false, starter: true, pro: true, premium: true },
      { feature: "Location insights", free: false, starter: false, pro: true, premium: true },
      { feature: "Device & browser data", free: false, starter: false, pro: true, premium: true },
      { feature: "A/B link testing", free: false, starter: false, pro: true, premium: true },
      { feature: "Conversion tracking", free: false, starter: false, pro: false, premium: true },
      { feature: "Data export (CSV)", free: false, starter: false, pro: false, premium: true },
    ],
  },
  {
    category: "Commerce & monetization",
    rows: [
      { feature: "Tip jar", free: false, starter: true, pro: true, premium: true },
      { feature: "E-commerce integrations", free: false, starter: false, pro: true, premium: true },
      { feature: "Collect emails / SMS", free: false, starter: false, pro: true, premium: true },
      { feature: "Product embeds", free: false, starter: false, pro: true, premium: true },
      { feature: "Payment gating", free: false, starter: false, pro: false, premium: true },
      { feature: "Revenue analytics", free: false, starter: false, pro: false, premium: true },
    ],
  },
  {
    category: "Management & collaboration",
    rows: [
      { feature: "Single user", free: true, starter: true, pro: true, premium: true },
      { feature: "QR code generator", free: true, starter: true, pro: true, premium: true },
      { feature: "Custom domain", free: false, starter: false, pro: true, premium: true },
      { feature: "Team members", free: false, starter: false, pro: false, premium: true },
      { feature: "Role-based permissions", free: false, starter: false, pro: false, premium: true },
      { feature: "Client workspaces", free: false, starter: false, pro: false, premium: true },
      { feature: "SSO / SAML", free: false, starter: false, pro: false, premium: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Help center access", free: true, starter: true, pro: true, premium: true },
      { feature: "Email support", free: true, starter: true, pro: true, premium: true },
      { feature: "Priority email support", free: false, starter: true, pro: true, premium: true },
      { feature: "Live chat support", free: false, starter: false, pro: true, premium: true },
      { feature: "Dedicated success manager", free: false, starter: false, pro: false, premium: true },
      { feature: "Priority onboarding", free: false, starter: false, pro: false, premium: true },
    ],
  },
];

// ─── Showcase Cards ───────────────────────────────────────────
export const showcaseCards = [
  {
    title: "Showcase customization",
    description:
      "Match your brand with themes, colors, fonts, and animated backgrounds that make your page truly yours.",
    color: "emerald",
  },
  {
    title: "Actionable analytics",
    description:
      "Understand who clicks, where they come from, and what converts — all from a single dashboard.",
    color: "violet",
  },
  {
    title: "Scale & earn instantly",
    description:
      "Sell products, collect tips, capture emails, and monetize your audience without leaving Taptree.",
    color: "amber",
  },
];

// ─── Testimonial ──────────────────────────────────────────────
export const testimonial = {
  quote:
    "I'd recommend Taptree to other creators! It's very powerful for getting more eyes on your content.",
  author: "Ava Johnson",
  role: "Content Creator, 1.2M followers",
};

// ─── FAQ ──────────────────────────────────────────────────────
export const faqs = [
  {
    q: "What is a Taptree and why do I need one?",
    a: "Taptree is your customizable link-in-bio page. It's a single URL that houses all your important links, content, and social profiles — perfect for Instagram, TikTok, Twitter, and anywhere you only get one link.",
  },
  {
    q: "Can I customize my Taptree?",
    a: "Absolutely. Free users get basic themes and colors. Starter and above unlock animated themes, custom fonts, button styles, and backgrounds. Premium users can even add custom CSS.",
  },
  {
    q: "What tools are included with Taptree to grow and manage my audience?",
    a: "Every plan includes unlimited links and basic analytics. Paid plans add email collection, scheduled links, advanced analytics, A/B testing, and commerce integrations to help you grow and monetize.",
  },
  {
    q: "Is there a way to use all premium features for free?",
    a: "You can start with our generous free plan. We also offer a 14-day free trial of Pro when you sign up, so you can explore advanced features before committing.",
  },
  {
    q: "Does Taptree charge any transaction fees?",
    a: "Taptree does not take a cut of your earnings. Standard payment processor fees (e.g., Stripe) still apply, but we never add our own commission on top.",
  },
  {
    q: "Can I use Taptree for my business, or just as an individual?",
    a: "Both! Individuals, creators, small businesses, and large agencies all use Taptree. Our Premium plan adds team seats, permissions, and workspaces built for organizations.",
  },
  {
    q: "Where can I download the Taptree app?",
    a: "Taptree works right in your browser — no app download required. Your page is fully responsive and looks great on mobile, tablet, and desktop.",
  },
];
