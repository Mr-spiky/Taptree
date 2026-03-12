"use client";

import { useCallback } from "react";

const HOVER_CLASSES = [
  "hover-theme-yellow",
  "hover-theme-green",
  "hover-theme-blue",
  "hover-theme-purple",
  "hover-theme-red",
];

export default function LinkButton({ href, handle, linkIndex, children, index }) {
  const normalizedUrl =
    href.startsWith("http://") || href.startsWith("https://")
      ? href
      : `https://${href}`;

  const trackClick = useCallback(() => {
    if (typeof handle !== "string" || typeof linkIndex !== "number") return;
    const payload = JSON.stringify({ handle, linkIndex });
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track-click", blob);
    } else {
      fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => { });
    }
  }, [handle, linkIndex]);

  const hoverClass = HOVER_CLASSES[(index || 0) % HOVER_CLASSES.length];

  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      aria-label={`${children} (opens in new tab)`}
      className={`link-button group animate-fade-in-up ${hoverClass}`}
      style={{
        animationDelay: `${(index + 1) * 100}ms`,
        animationFillMode: "both",
      }}
    >
      <span className="flex-1 text-center">{children}</span>
      <svg
        className="w-4 h-4 text-brutal-gray opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
