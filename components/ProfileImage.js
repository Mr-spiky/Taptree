"use client";

import { useState, memo } from "react";
import Image from "next/image";

// Memoized to prevent unnecessary re-renders when parent updates
const ProfileImage = memo(function ProfileImage({ src, handle, size = "lg" }) {
  const [hasError, setHasError] = useState(false);
  const initial = handle ? handle.charAt(0).toUpperCase() : "?";

  // Size configurations
  const sizeConfig = {
    sm: { dimension: 48, textClass: "text-lg" },
    md: { dimension: 64, textClass: "text-xl" },
    lg: { dimension: 96, textClass: "text-3xl" },
  };

  const { dimension, textClass } = sizeConfig[size] || sizeConfig.lg;

  // Fallback avatar (no image or error)
  if (hasError || !src) {
    return (
      <div className="relative animate-fade-in">
        <div className="absolute -inset-1 bg-linear-to-r from-violet-400 to-fuchsia-400 rounded-full blur opacity-75" />
        <div 
          className="relative rounded-full bg-linear-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center border-4 border-white shadow-lg"
          style={{ width: dimension, height: dimension }}
        >
          <span className={`font-bold text-white ${textClass}`}>
            {initial}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-in">
      <div className="absolute -inset-1 bg-linear-to-r from-violet-400 to-fuchsia-400 rounded-full blur opacity-75" />
      <Image
        src={src}
        alt={`${handle}'s profile picture`}
        width={dimension}
        height={dimension}
        className="relative rounded-full object-cover border-4 border-white shadow-lg"
        onError={() => setHasError(true)}
        // Lazy load by default, priority only for above-the-fold
        loading="lazy"
        // Prevent layout shift
        style={{ width: dimension, height: dimension }}
      />
    </div>
  );
});

export default ProfileImage;
