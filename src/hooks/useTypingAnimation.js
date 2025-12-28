import { useEffect, useState } from "react";

/**
 * Custom hook for typing animation effect.
 * Types out text character by character or in chunks.
 * 
 * @param {string} text - The text to type out
 * @param {number} speed - Typing speed in milliseconds per character
 * @param {boolean} enabled - Whether to start typing
 * @returns {string} The currently displayed text
 */
export default function useTypingAnimation(text, speed = 30, enabled = true) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!enabled || !text) {
            setDisplayedText("");
            return;
        }

        setDisplayedText("");
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                // Sometimes type in chunks (2-4 chars) for more realistic effect
                const chunkSize = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 2 : 1;
                const endIndex = Math.min(currentIndex + chunkSize, text.length);
                setDisplayedText(text.substring(0, endIndex));
                currentIndex = endIndex;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, enabled]);

    return displayedText;
}

