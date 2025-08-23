import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { usePostGuestbookEntry } from "../providers/backendApi";

const GuestbookWriter = () => {
	const postMutation = usePostGuestbookEntry();
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (name && message) {
			const newEntry = {
				name,
				message,
				submittedAt: new Date().toISOString() // Ensure this is in UTC format
			};
			try {
				const result = await postMutation.mutateAsync(newEntry);
				if (result.error) {
					setError(result.error);
				} else {
					setName("");
					setMessage("");
					setError(null);
				}
			} catch (error) {
				console.error("Failed to save the new entry:", error);
				setError(error.message);
			}
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				p: 2,
				backgroundColor: "spotifyLightGrey.main",
				color: "white",
				mb: 2,
				borderRadius: 0,
				boxShadow: 0,
				width: "100%",
			}}
		>
			<TextField
				label="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
				required
				margin="normal"
				sx={{ mb: 2 }}
				inputProps={{ maxLength: 50 }}
			/>
			<TextField
				label="Message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				fullWidth
				required
				multiline
				rows={4}
				margin="normal"
				sx={{ mb: 2 }}
				inputProps={{ maxLength: 500, color: "white" }}
				helperText={`${message.length}/500`}
			/>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				fullWidth
				sx={{ color: "#000000", borderRadius: 0 }}
			>
				Write
			</Button>
			{error && <Typography color="error">{error}</Typography>}
		</Box>
	);
};

export default GuestbookWriter;
