import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { subscribeToStream } from "../sse/stream";

/**
 * Subscribe to guestbook SSE events and refresh cached guestbook queries.
 * This makes guestbook updates real-time across clients.
 */
export default function useGuestbookStream(enabled = true) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!enabled) return;

        const unsubscribe = subscribeToStream("guestbookEntry", (_e) => {
            // Easiest + correct with pagination: just refetch visible pages.
            queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] });
        });

        return () => unsubscribe();
    }, [enabled, queryClient]);
}

