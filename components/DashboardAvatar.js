"use client";

import { useState, memo } from "react";
import Image from "next/image";

// Memoized to prevent re-renders when sibling items update
const DashboardAvatar = memo(function DashboardAvatar({ src, handle, linkCount }) {
  const [hasError, setHasError] = useState(false);
  const initial = handle ? handle.charAt(0).toUpperCase() : "?";

  return (
    <div className="relative">
      {hasError || !src ? (
        <div className="w-12 h-12 rounded-xl bg-brutal-yellow border-[2px] border-brutal-border flex items-center justify-center shadow-[2px_2px_0px_0px_#1a1a1a]">
          <span className="text-lg font-black text-brutal-black">{initial}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={handle}
          width={48}
          height={48}
          className="rounded-xl object-cover border-[2px] border-brutal-border shadow-[2px_2px_0px_0px_#1a1a1a]"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brutal-green border-[1.5px] border-brutal-border rounded-full flex items-center justify-center text-brutal-black text-xs font-black shadow-sm">
        {linkCount}
      </div>
    </div>
  );
});

export default DashboardAvatar;
