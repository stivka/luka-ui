import { apiUrl } from "../config";

// Single shared SSE connection to the backend stream endpoint.
// Multiple consumers can subscribe to different event types via addEventListener.

const STREAM_PATH = "/api/stream";

let currentStreamUrl = null;
let eventSource = null;

// Total active subscriptions across all event types.
let subscriptionCount = 0;

// eventName -> Set<callback(Event)>
const listenersByEvent = new Map();

// eventName -> dispatcher(Event) (stable function reference so we can remove it)
const dispatcherByEvent = new Map();

function getStreamUrl() {
    // Note: apiUrl is expected to be something like "http://localhost:8080"
    return `${apiUrl}${STREAM_PATH}`;
}

function ensureConnected() {
    const streamUrl = getStreamUrl();

    // If the backend URL changes (env/config swap), reconnect.
    if (eventSource && currentStreamUrl && currentStreamUrl !== streamUrl) {
        try {
            eventSource.close();
        } catch {
            // ignore
        }
        eventSource = null;
        currentStreamUrl = null;
    }

    if (eventSource) return eventSource;

    currentStreamUrl = streamUrl;
    eventSource = new EventSource(streamUrl);

    // Attach any existing dispatchers (in case of reconnect).
    for (const [eventName, dispatcher] of dispatcherByEvent.entries()) {
        eventSource.addEventListener(eventName, dispatcher);
    }

    eventSource.onerror = (e) => {
        // EventSource will automatically attempt to reconnect.
        // Keep this log minimal to avoid noise in normal operation.
        // eslint-disable-next-line no-console
        console.error("SSE stream error:", e);
    };

    return eventSource;
}

function ensureDispatcher(eventName) {
    if (dispatcherByEvent.has(eventName)) return dispatcherByEvent.get(eventName);

    const dispatcher = (e) => {
        const listeners = listenersByEvent.get(eventName);
        if (!listeners || listeners.size === 0) return;

        // Copy to avoid issues if a listener unsubscribes itself mid-iteration.
        for (const cb of Array.from(listeners)) {
            try {
                cb(e);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(`SSE listener for "${eventName}" failed:`, err);
            }
        }
    };

    dispatcherByEvent.set(eventName, dispatcher);

    if (eventSource) {
        eventSource.addEventListener(eventName, dispatcher);
    }

    return dispatcher;
}

function maybeClose() {
    if (subscriptionCount !== 0) return;
    if (!eventSource) return;

    try {
        // Clean up event listeners to avoid retaining closures.
        for (const [eventName, dispatcher] of dispatcherByEvent.entries()) {
            eventSource.removeEventListener(eventName, dispatcher);
        }
        eventSource.close();
    } catch {
        // ignore
    } finally {
        eventSource = null;
        currentStreamUrl = null;
    }
}

/**
 * Subscribe to a named SSE event on the shared `/api/stream` connection.
 *
 * @param {string} eventName SSE event name (e.g. "visitorCount", "notification")
 * @param {(event: MessageEvent) => void} onMessage handler
 * @returns {() => void} unsubscribe function
 */
export function subscribeToStream(eventName, onMessage) {
    if (typeof eventName !== "string" || !eventName.trim()) {
        throw new Error("subscribeToStream: eventName must be a non-empty string");
    }
    if (typeof onMessage !== "function") {
        throw new Error("subscribeToStream: onMessage must be a function");
    }

    const key = eventName.trim();
    const listeners = listenersByEvent.get(key) ?? new Set();
    listenersByEvent.set(key, listeners);

    listeners.add(onMessage);
    subscriptionCount += 1;

    // Ensure we have one live EventSource and one dispatcher per event type.
    ensureConnected();
    ensureDispatcher(key);

    return () => {
        const set = listenersByEvent.get(key);
        if (!set || !set.has(onMessage)) return;

        set.delete(onMessage);
        subscriptionCount = Math.max(0, subscriptionCount - 1);

        // If no listeners remain for this event, detach its dispatcher from the stream.
        if (set.size === 0) {
            listenersByEvent.delete(key);
            const dispatcher = dispatcherByEvent.get(key);
            if (dispatcher && eventSource) {
                try {
                    eventSource.removeEventListener(key, dispatcher);
                } catch {
                    // ignore
                }
            }
            dispatcherByEvent.delete(key);
        }

        maybeClose();
    };
}

