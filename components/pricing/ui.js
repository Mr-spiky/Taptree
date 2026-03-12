// Shared micro-components used across pricing sections.
// Pure, stateless, server-safe — no "use client" needed.

import Link from "next/link";

/* ─── Check / Dash Icon ─────────────────────────────────────── */
export function CheckIcon({ active = true, className = "" }) {
  if (!active) {
    return (
      <span
        className={`inline-block h-1.5 w-5 rounded-full bg-slate-200 ${className}`}
        aria-label="Not included"
      />
    );
  }
  return (
    <svg
      className={`h-5 w-5 text-emerald-600 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      aria-label="Included"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ─── Section Wrapper ───────────────────────────────────────── */
export function Section({ children, className = "", id, bg = "white" }) {
  const bgMap = {
    white: "bg-white",
    gray: "bg-slate-50",
    dark: "bg-slate-900",
    violet: "bg-violet-50",
    emerald: "bg-emerald-50",
  };
  return (
    <section id={id} className={`${bgMap[bg] || bg} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ─── Section Header ────────────────────────────────────────── */
export function SectionHeader({ eyebrow, title, subtitle, center = true, dark = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            dark ? "text-emerald-400" : "text-emerald-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-black tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── CTA Button ────────────────────────────────────────────── */
export function CTAButton({
  href = "/signup",
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200";
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary:
      "bg-violet-700 text-white hover:bg-violet-800 shadow-sm hover:shadow-md active:scale-[0.98]",
    outline:
      "border-2 border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]",
    ghost: "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
    dark: "bg-lime-300 text-slate-900 hover:bg-lime-400 shadow-sm hover:shadow-md active:scale-[0.98]",
    "dark-outline":
      "border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/5 active:scale-[0.98]",
  };

  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

/* ─── Step Icon ─────────────────────────────────────────────── */
export function StepIcon({ name, className = "h-6 w-6" }) {
  const icons = {
    "user-plus": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    ),
    palette: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    ),
    chart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  };
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[name] || icons["chart"]}
    </svg>
  );
}
