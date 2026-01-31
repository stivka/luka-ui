import { useState, useEffect, useRef } from "react";
import useTransmission from "../hooks/useTransmission";
import useTransmissionEnabled from "../hooks/useTransmissionEnabled";
import TransmissionItem from "./TransmissionItem";

/**
 * Transmission terminal component.
 * Displays incoming transmissions in a terminal-style interface with typing animation.
 */
export default function Transmission() {
    const enabled = useTransmissionEnabled();
    const { items } = useTransmission(enabled);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [newItemIds, setNewItemIds] = useState(new Set());
    const [dismissedIds, setDismissedIds] = useState(new Set());
    const containerRef = useRef(null);

    const maxItemsRaw = process.env.REACT_APP_TRANSMISSION_MAX_ITEMS;
    const maxItemsParsed = Number.parseInt(maxItemsRaw, 10);
    const maxItems =
        Number.isFinite(maxItemsParsed) && maxItemsParsed > 0 ? maxItemsParsed : 5;

    const dismissItem = (itemId) => {
        setDisplayedItems((prev) =>
            prev.filter((item) => `${item.ts}-${item.message}` !== itemId)
        );
        setNewItemIds((prevIds) => {
            const updated = new Set(prevIds);
            updated.delete(itemId);
            return updated;
        });
        setDismissedIds((prevIds) => {
            const updated = new Set(prevIds);
            updated.add(itemId);
            return updated;
        });
    };

    // Track new items for typing animation
    useEffect(() => {
        if (items.length > 0) {
            const latestItem = items[0];
            const itemId = `${latestItem.ts}-${latestItem.message}`;
            
            if (dismissedIds.has(itemId)) return;

            setDisplayedItems(prev => {
                // Check if this is a new item
                const exists = prev.some(item => `${item.ts}-${item.message}` === itemId);
                if (!exists) {
                    // Mark as new for animation
                    setNewItemIds(prevIds => new Set([itemId, ...prevIds]));
                    
                    // Remove from new items after animation completes (estimate based on message length)
                    const animationDuration = latestItem.message.length * 60 + 1000;
                    setTimeout(() => {
                        setNewItemIds(prevIds => {
                            const updated = new Set(prevIds);
                            updated.delete(itemId);
                            return updated;
                        });
                    }, animationDuration);
                    
                    // Add to end of array (will appear at bottom with column-reverse)
                    // Limit items to keep them in viewport
                    const updated = [...prev, latestItem];
                    return updated.slice(-maxItems);
                }
                return prev;
            });
        }
    }, [items, dismissedIds, maxItems]);


    return (
        <div 
            ref={containerRef}
            style={{ 
                position: "fixed", 
                right: 16, 
                bottom: 16,
                width: 400,
                fontFamily: "'Courier New', 'Consolas', monospace",
                fontSize: 12,
                lineHeight: 1.4,
                // Make sure this sits above anything else (including app windows / iframes)
                zIndex: 2147483647,
                display: "flex",
                flexDirection: "column-reverse",
                alignItems: "flex-end",
                pointerEvents: "none",
                // Override the global “green cursor” so hover/click state is reliable/obvious.
                cursor: "default"
            }}
        >
            {displayedItems.map((item, index) => {
                const itemId = `${item.ts}-${item.message}`;
                const isNew = newItemIds.has(itemId);
                
                return (
                    <TransmissionItem 
                        key={itemId}
                        item={item}
                        index={index}
                        isNew={isNew}
                        itemId={itemId}
                        onDismiss={dismissItem}
                    />
                );
            })}
            <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
