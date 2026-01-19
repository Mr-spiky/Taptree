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
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-gray-100 group-hover:ring-emerald-100 transition-all duration-200">
          <span className="text-lg font-bold text-emerald-600">{initial}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={handle}
          width={48}
          height={48}
          className="rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-emerald-100 transition-all duration-200"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-sm">
        {linkCount}
      </div>
    </div>
  );
});

export default DashboardAvatar;
