import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiUrl } from "../config";

const request = async (method, url, body, options = {}) => {
	const response = await fetch(`${apiUrl}${url}`, {
		method,
    body: body ? JSON.stringify(body) : undefined,
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});
	return response.json();
};

export function useGetVisitorCount(options) {
	return useQuery({
		queryKey: ["visitorCount"],
		queryFn: () => request("GET", "/visitor-count"),
		refetchOnWindowFocus: false,
		...options,
	});
}

export function useGetGuestbookEntries(query, options) {
	const queryParams = new URLSearchParams();
	if (query.page) queryParams.append("page", query.page.toString());
	if (query.limit) queryParams.append("limit", query.limit.toString());

	return useQuery({
		queryKey: ["guestbookEntries", { ...query }],
		queryFn: () => request("GET", `/guestbook?${queryParams}`),
		refetchOnWindowFocus: false,
		...options,
	});
}

export function usePostGuestbookEntry(options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newEntry) => request("POST", "/guestbook", newEntry),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["guestbookEntries"] }),
		...options,
	});
}
