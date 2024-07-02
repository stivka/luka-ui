import { Box, Typography } from "@mui/material";
import React from "react";
import { useGetVisitorCount } from "../providers/backendApi";

const VisitorCounter = () => {
	const { data: count } = useGetVisitorCount();

	return (
		<Box
			sx={{
				backgroundColor: "spotifyLightGrey.main",
				color: "white",
				borderRadius: 0,
				boxShadow: 0,
				textAlign: "center",
			}}
		>
			<Typography variant="h5">Visitor Count: {count}</Typography>
		</Box>
	);
};

export default VisitorCounter;
