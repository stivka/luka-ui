import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useGetGuestbookEntries } from "../providers/backendApi";
import GuestbookEntry from "./GuestbookEntry";
import GuestbookWriter from "./GuestbookWriter";
import Loading from "./Loading";

const entriesPerPage = 5;

const Guestbook = () => {
	const [page, setPage] = useState(1);

	const { data: entries, isLoading } = useGetGuestbookEntries({
		page: page - 1,
		limit: entriesPerPage,
	});

	const handlePageChange = (_event, value) => setPage(value);

	return (
		<Stack sx={{ alignItems: "center" }}>
			<img
				src="/guestbook_500x200.gif"
				alt="Guestbook Banner"
				style={{ width: "60%", height: "auto", flexShrink: 0, padding: 8 }}
			/>
			<GuestbookWriter />
			{isLoading && <Loading />}
			{entries?.content?.map((entry) => (
				<GuestbookEntry key={entry.id} entry={entry} />
			))}
			{entries?.totalPages > 1 && (
				<Pagination
					count={entries?.totalPages}
					page={page}
					onChange={handlePageChange}
					color="primary"
					sx={{ justifyContent: "center", display: "flex", my: 2 }}
				/>
			)}
		</Stack>
	);
};

export default Guestbook;
