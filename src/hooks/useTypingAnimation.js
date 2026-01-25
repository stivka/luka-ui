import { useEffect, useState, useRef } from "react";

/**
 * Custom hook for typing animation effect.
 * Types out text character by character or in chunks.
 * Messages persist after typing completes.
 * 
 * @param {string} text - The text to type out
 * @param {number} speed - Typing speed in milliseconds per character
 * @param {boolean} enabled - Whether to start typing
 * @returns {string} The currently displayed text
 */
export default function useTypingAnimation(text, speed = 60, enabled = true) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const previousTextRef = useRef("");

    useEffect(() => {
        // If text changed, reset animation
        if (previousTextRef.current !== text) {
            setDisplayedText("");
            setIsComplete(false);
            previousTextRef.current = text;
        }

        // If animation disabled, always show full text (no truncation).
        // This matters when a message stops being "new" before typing completes.
        if (!enabled) {
            setDisplayedText(text || "");
            setIsComplete(!!text);
            return;
        }

        if (!text) {
            setDisplayedText("");
            setIsComplete(false);
            return;
        }

        // If already complete, just ensure full text is displayed
        if (isComplete) {
            setDisplayedText(text);
            return;
        }

        // Start typing animation
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                // Sometimes type in chunks (1-2 chars) for more realistic effect
                const chunkSize = Math.random() > 0.8 ? 2 : 1;
                const endIndex = Math.min(currentIndex + chunkSize, text.length);
                setDisplayedText(text.substring(0, endIndex));
                currentIndex = endIndex;
            } else {
                setIsComplete(true);
                setDisplayedText(text); // Ensure full text is displayed
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, enabled, isComplete]);

    // Always return full text once complete
    if (isComplete && text) {
        return text;
    }

    return displayedText;
}

