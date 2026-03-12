"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollReveal – wraps children in a container that fades/slides into view
 * when it enters the viewport using IntersectionObserver.
 *
 * Props:
 *  - direction: "up" (default) | "left" | "right" | "scale"
 *  - delay: delay in ms before animation triggers (default 0)
 *  - threshold: 0-1, how much must be visible (default 0.15)
 *  - className: extra classes on the wrapper
 *  - children
 */
export default function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    threshold = 0.15,
    className = "",
    as: Tag = "div",
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Apply delay if specified
                    if (delay > 0) {
                        setTimeout(() => el.classList.add("revealed"), delay);
                    } else {
                        el.classList.add("revealed");
                    }
                    observer.unobserve(el); // Only animate once
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, threshold]);

    const directionClass = {
        up: "reveal",
        left: "reveal-left",
        right: "reveal-right",
        scale: "reveal-scale",
    }[direction] || "reveal";

    return (
        <Tag ref={ref} className={`${directionClass} ${className}`}>
            {children}
        </Tag>
    );
}
