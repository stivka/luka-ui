import useTypingAnimation from "../hooks/useTypingAnimation";

/**
 * Individual transmission item with typing animation.
 */
export default function TransmissionItem({ item, index, isNew, itemId, onDismiss }) {
    const displayedMessage = useTypingAnimation(item.message, 60, isNew);

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

    const normalizeTx = (tx) => {
        if (!tx) return null;
        // Keep it terminal-ish: upper-case and short.
        const cleaned = String(tx).trim().toUpperCase();
        if (!cleaned) return null;
        // Railway public domains can be long; show last 18 chars.
        return cleaned.length > 18 ? cleaned.slice(-18) : cleaned;
    };

    const timestamp = formatTimestamp(item.ts);
    const tx = normalizeTx(item.tx);
    const transmitterTag = tx ? `TX-${tx}` : "TX-UNKNOWN";
    const isTyping = isNew && displayedMessage.length < item.message.length;

    return (
        <div 
            style={{ 
                position: "relative",
                padding: "8px 12px",
                marginBottom: 4,
                backgroundColor: "#000000",
                border: "1px solid #00ff00",
                borderLeftWidth: 3,
                color: "#00ff00",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.3)",
                pointerEvents: "auto",
                cursor: "default",
                width: "100%",
                maxWidth: 400
            }}
        >
            <button
                type="button"
                aria-label="Dismiss transmission"
                onPointerDown={(e) => {
                    // Use pointerdown (not click) so dismiss works even if
                    // pointerup/click gets swallowed by an underlying layer/iframe.
                    e.preventDefault();
                    e.stopPropagation();
                    onDismiss?.(itemId);
                }}
                style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 18,
                    height: 18,
                    padding: 0,
                    border: "1px solid #00ff00",
                    backgroundColor: "#000000",
                    color: "#00ff00",
                    cursor: "pointer",
                    lineHeight: "16px",
                    fontSize: 12,
                    fontFamily: "inherit",
                    opacity: 0.9,
                    zIndex: 2,
                    pointerEvents: "auto"
                }}
            >
                ×
            </button>
            <div style={{ 
                fontSize: 10, 
                color: "#00aa00",
                marginBottom: 4,
                opacity: 0.8
            }}>
                [{timestamp}] {transmitterTag} | INCOMING
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

