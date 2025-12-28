import { useState, useEffect } from "react";

/**
 * Hook to manage transmission enabled state via console.
 * Allows toggling via window.toggleTransmission() in browser console.
 */
export default function useTransmissionEnabled() {
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        // Expose toggle function to window for console access
        window.toggleTransmission = () => {
            setEnabled(prev => {
                const newValue = !prev;
                console.log(`Transmissions ${newValue ? 'ENABLED' : 'DISABLED'}`);
                return newValue;
            });
        };

        // Expose getter function
        window.getTransmissionStatus = () => {
            console.log(`Transmissions are currently: ${enabled ? 'ENABLED' : 'DISABLED'}`);
            return enabled;
        };

        return () => {
            delete window.toggleTransmission;
            delete window.getTransmissionStatus;
        };
    }, [enabled]);

    return enabled;
}

