"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function HeroForm() {
  const router = useRouter();
  const [handle, setHandle] = useState("");

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (handle.trim()) {
      router.push(`/generate?handle=${encodeURIComponent(handle.trim())}`);
    }
  }, [handle, router]);

  const scrollToTop = useCallback(() => {
    document.getElementById('handle-input')?.focus();
  }, []);

  return (
    <>
      {/* CTA Form */}
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md mx-auto lg:mx-0">
        <label htmlFor="handle-input" className="sr-only">
          Enter your handle
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none">
              taptree/
            </span>
            <input
              id="handle-input"
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full pl-20 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-300/50 transition-shadow text-lg"
              placeholder="yourname"
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25 focus:outline-none focus:ring-4 focus:ring-amber-300/50 whitespace-nowrap"
          >
            Claim your Taptree
          </button>
        </div>
        <p className="mt-4 text-emerald-200/60 text-sm">
          Free forever. No credit card required.
        </p>
      </form>
    </>
  );
}

// Export the CTA button separately for the bottom section
export function BottomCTA() {
  const handleClick = useCallback(() => {
    document.getElementById('handle-input')?.focus();
  }, []);

  return (
    <button
      onClick={handleClick}
      className="px-10 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold rounded-xl text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25 focus:outline-none focus:ring-4 focus:ring-amber-300/50"
    >
      Get Started — It&apos;s Free
    </button>
  );
}
