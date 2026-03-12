"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * TypeWriter – cycles through an array of words with a typing effect.
 *
 * Props:
 *  - words: string[] — words to cycle through
 *  - typingSpeed: ms per character typed (default 80)
 *  - deletingSpeed: ms per character deleted (default 40)
 *  - pauseDuration: ms to pause when a word is fully typed (default 2000)
 *  - className: extra classes for the text span
 */
export default function TypeWriter({
    words = [],
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 2000,
    className = "",
}) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef(null);

    const tick = useCallback(() => {
        const currentWord = words[currentWordIndex] || "";

        if (!isDeleting) {
            // Typing
            const nextText = currentWord.slice(0, displayText.length + 1);
            setDisplayText(nextText);

            if (nextText === currentWord) {
                // Word complete — pause, then start deleting
                timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
                return;
            }
            timeoutRef.current = setTimeout(tick, typingSpeed);
        } else {
            // Deleting
            const nextText = currentWord.slice(0, displayText.length - 1);
            setDisplayText(nextText);

            if (nextText === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                timeoutRef.current = setTimeout(tick, typingSpeed);
                return;
            }
            timeoutRef.current = setTimeout(tick, deletingSpeed);
        }
    }, [currentWordIndex, displayText, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration]);

    useEffect(() => {
        timeoutRef.current = setTimeout(tick, typingSpeed);
        return () => clearTimeout(timeoutRef.current);
    }, [tick, typingSpeed]);

    return (
        <span className={className}>
            {displayText}
            <span className="typing-cursor" aria-hidden="true" />
        </span>
    );
}
