import { useEffect, useState } from "react";
import { apiUrl } from "../config";

/**
 * Custom hook for real-time visitor count via SSE.
 * Automatically receives updates when the count changes.
 * 
 * @returns {number|null} Current visitor count, or null if not yet loaded
 */
export default function useVisitorCount() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const streamUrl = `${apiUrl}/api/stream`;
        const es = new EventSource(streamUrl);

        es.addEventListener("visitorCount", (e) => {
            try {
                const data = JSON.parse(e.data);
                setCount(data.count);
            } catch (error) {
                console.error("Failed to parse visitor count:", error);
            }
        });

        es.onerror = (e) => {
            console.error("SSE visitor count error:", e);
            // EventSource will automatically attempt to reconnect
        };

        return () => {
            es.close();
        };
    }, []);

    return count;
}

