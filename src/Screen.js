import { Box, Container } from "@mui/material";
import React from "react";
import Monitor from "./components/Monitor";

export default function MainApp() {
	return (
		<Container>
			<Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
				<Monitor />
			</Box>
		</Container>
	);
}
