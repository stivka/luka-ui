import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
const { formatDistanceToNow } = require("date-fns");

const GuestbookEntry = ({ entry }) => (
	<Card sx={{ mb: 2, borderRadius: 0, width: "100%" }}>
		<CardContent
			sx={{
				padding: "4px",
				backgroundColor: "spotifyDarkGrey.main",
				color: "white",
			}}
		>
			<Typography variant="h6" align="center">
				{entry.name}
			</Typography>
			<Typography variant="body2" color="white" align="center">
				{formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
			</Typography>
			<Typography variant="body1" align="center">
				{entry.message}
			</Typography>
		</CardContent>
	</Card>
);

export default GuestbookEntry;
