import { useEffect, useState } from "react";
import useTypingAnimation from "../hooks/useTypingAnimation";

/**
 * Individual transmission item with typing animation.
 */
export default function TransmissionItem({ item, index, isNew }) {
    const displayedMessage = useTypingAnimation(item.message, 25, isNew);

    // Format timestamp to look like terminal log
    const formatTimestamp = (timestamp) => {
        try {
            const date = new Date(timestamp);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const ms = String(date.getMilliseconds()).padStart(3, '0');
            return `${hours}:${minutes}:${seconds}.${ms}`;
        } catch {
            return new Date().toLocaleTimeString();
        }
    };

    // Generate receiver tag (simulate different receivers)
    const getReceiverTag = (idx) => {
        const receivers = [
            "RX-001",
            "RX-042",
            "RX-7A3",
            "RX-9F1",
            "RX-B2C"
        ];
        return receivers[idx % receivers.length];
    };

    const timestamp = formatTimestamp(item.ts);
    const receiverTag = getReceiverTag(index);
    const isTyping = isNew && displayedMessage.length < item.message.length;

    return (
        <div 
            style={{ 
                padding: "8px 12px",
                marginBottom: 4,
                backgroundColor: "#000000",
                border: "1px solid #00ff00",
                borderLeftWidth: 3,
                color: "#00ff00",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.3)"
            }}
        >
            <div style={{ 
                fontSize: 10, 
                color: "#00aa00",
                marginBottom: 4,
                opacity: 0.8
            }}>
                [{timestamp}] {receiverTag} | INCOMING
            </div>
            <div style={{ color: "#00ff00" }}>
                {displayedMessage}
                {isTyping && (
                    <span style={{ 
                        animation: "blink 1s infinite",
                        marginLeft: 2
                    }}>▊</span>
                )}
            </div>
        </div>
    );
}

