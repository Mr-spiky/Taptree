"use client";

import { useState, useEffect, useRef } from "react";

/**
 * AnimatedCounter – counts up from 0 to a target number when it scrolls into view.
 *
 * Props:
 *  - target: number — the final value to count up to
 *  - suffix: string — appended after the number (e.g. "M+", "B+", "K+")
 *  - duration: ms — how long the count-up takes (default 2000)
 *  - className: extra classes
 */
export default function AnimatedCounter({
    target,
    suffix = "",
    duration = 2000,
    className = "",
}) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        const startTime = performance.now();
        let animationFrame;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic for a natural deceleration feel
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easedProgress * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, target, duration]);

    return (
        <span ref={ref} className={className}>
            {count}
            {suffix}
        </span>
    );
}
