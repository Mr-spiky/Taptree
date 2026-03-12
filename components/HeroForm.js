"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroForm() {
  const [handle, setHandle] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handle.trim()) {
      router.push(`/signup?handle=${handle.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="flex-1 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brutal-gray font-bold text-sm">taptree.io/</span>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="brutal-input pl-[5.5rem] text-sm font-bold"
          placeholder="yourname"
          required
        />
      </div>
      <button type="submit" className="brutal-btn brutal-btn-yellow px-6 py-3.5 text-sm hover-wobble">
        Claim →
      </button>
    </form>
  );
}

export function BottomCTA() {
  const [handle, setHandle] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handle.trim()) {
      router.push(`/signup?handle=${handle.trim()}`);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full relative z-10">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brutal-gray font-bold text-sm">taptree.io/</span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="brutal-input pl-[5.5rem] text-sm font-bold bg-white"
            placeholder="yourname"
            required
          />
        </div>
        <button type="submit" className="brutal-btn brutal-btn-black px-6 py-3.5 text-sm hover-wobble group relative z-10">
          <span className="group-hover:scale-110 transition-transform inline-block">GET STARTED →</span>
        </button>
      </form>

      {/* Absolute Image pointing at the CTA button */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-36 lg:-right-44 z-0 animate-hero-float">
        <img src="/img/5.png" alt="" className="w-32 lg:w-40 h-auto object-contain drop-shadow-lg -rotate-6" />
      </div>
    </div>
  );
}
