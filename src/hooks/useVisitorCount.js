import { useEffect, useState } from "react";
import { subscribeToStream } from "../sse/stream";

/**
 * Custom hook for real-time visitor count via SSE.
 * Automatically receives updates when the count changes.
 * 
 * @returns {number|null} Current visitor count, or null if not yet loaded
 */
export default function useVisitorCount() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const unsubscribe = subscribeToStream("visitorCount", (e) => {
            try {
                const data = JSON.parse(e.data);
                setCount(data.count);
            } catch (error) {
                console.error("Failed to parse visitor count:", error);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return count;
}

