import { useEffect, useState } from "react";
import { apiUrl } from "../config";

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

        const streamUrl = `${apiUrl}/api/transmissions/stream`;
        const es = new EventSource(streamUrl);

        es.addEventListener("notification", (e) => {
            try {
                const msg = JSON.parse(e.data);
                setItems((prev) => [msg, ...prev]);
            } catch (error) {
                console.error("Failed to parse transmission message:", error);
            }
        });

        es.onerror = (e) => {
            console.error("SSE transmission error:", e);
            // EventSource will automatically attempt to reconnect
        };

        return () => {
            es.close();
        };
    }, [enabled]);

    return { items };
}

