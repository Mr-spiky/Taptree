"use client";

import { useState, memo } from "react";
import Image from "next/image";

const ProfileImage = memo(function ProfileImage({ src, handle, size = "lg" }) {
  const [hasError, setHasError] = useState(false);
  const initial = handle ? handle.charAt(0).toUpperCase() : "?";

  const sizeConfig = {
    sm: { dimension: 48, textClass: "text-lg" },
    md: { dimension: 64, textClass: "text-xl" },
    lg: { dimension: 96, textClass: "text-3xl" },
  };

  const { dimension, textClass } = sizeConfig[size] || sizeConfig.lg;

  if (hasError || !src) {
    return (
      <div
        className="rounded-xl bg-brutal-yellow border-3 border-brutal-border flex items-center justify-center shadow-[3px_3px_0px_0px_#1a1a1a]"
        style={{ width: dimension, height: dimension, borderWidth: "3px" }}
      >
        <span className={`font-black text-brutal-black ${textClass}`}>
          {initial}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${handle}'s profile picture`}
      width={dimension}
      height={dimension}
      className="rounded-xl object-cover shadow-[3px_3px_0px_0px_#1a1a1a]"
      style={{ width: dimension, height: dimension, borderWidth: "3px", borderColor: "#1a1a1a", borderStyle: "solid" }}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
});

export default ProfileImage;
