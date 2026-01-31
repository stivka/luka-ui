import { useEffect, useState } from "react";
import { subscribeToStream } from "../sse/stream";

/**
 * Custom hook for managing SSE transmission connections.
 * Handles EventSource connection, message reception, and connection lifecycle.
 * 
 * @param {boolean} enabled - Whether the transmission connection should be active
 * @returns {Object} Object containing received transmission items
 */
export default function useTransmission(enabled = true) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!enabled) {
            setItems([]);
            return;
        }

        const unsubscribe = subscribeToStream("notification", (e) => {
            try {
                const msg = JSON.parse(e.data);
                setItems((prev) => [msg, ...prev]);
            } catch (error) {
                console.error("Failed to parse transmission message:", error);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [enabled]);

    return { items };
}

