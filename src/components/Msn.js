import { Box, Button, TextField, Typography } from "@mui/material";
import { format } from "date-fns"; // to format timestamps
// Msn.jsx
import React, { useState } from "react";
import { useChatGPT } from "../providers/chatGPT";

/**
 * Windows 2000-style chat component with:
 * - No header bar
 * - Classic gray background & borders
 * - Smaller fonts, Tahoma/MS Sans Serif
 * - Old chat log style: [timestamp] author: message
 * - Forced default cursor to override any custom cursor image
 * - Uses date-fns to format time
 */
export default function Msn() {
	// Chat messages: { role: "user"|"assistant", content: string, timestamp: Date }
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState("");

	// React Query mutation for GPT calls
	const { mutateAsync: fetchGPTResponse, isLoading } = useChatGPT();

	// Send user input + get AI response
	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		const userMsg = {
			role: "user",
			content: inputMessage,
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, userMsg]);

		try {
			const botResponse = await fetchGPTResponse(inputMessage);
			const botMsg = {
				role: "assistant",
				content: botResponse,
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, botMsg]);
		} catch (error) {
			console.error("GPT call error:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: "Sorry, something went wrong on my end.",
					timestamp: new Date(),
				},
			]);
		}

		setInputMessage("");
	};

	// Format timestamp with date-fns => "[h:mm aa]"
	const formatTimestamp = (date) => {
		if (!(date instanceof Date)) return "";
		return `[${format(date, "h:mm aa")}]`;
	};

	return (
		<Box
			sx={{
				// Force default cursor to override any custom cursor
				cursor: "default !important",

				// Classic window bounding box
				width: 320,
				height: 420,
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#ffffff",
				fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
				fontSize: "0.75rem",
			}}
		>
			{/* Messages area (no title/header bar) */}
			<Box
				sx={{
					flex: 1,
					overflowY: "auto",
					p: 1,
					borderBottom: "1px solid #A0A0A0", // Subtle divider
				}}
			>
				{messages.map((msg, idx) => {
					const isUser = msg.role === "user";
					return (
						<Typography
							key={idx}
							sx={{
								fontSize: "0.75rem",
								lineHeight: 1.2,
								mb: 0.5,
								color: "#000",
							}}
						>
							{formatTimestamp(msg.timestamp)} {isUser ? "You" : "Luka-Bot"}:{" "}
							{msg.content}
						</Typography>
					);
				})}
			</Box>

			{/* Footer: "input + send" bar in Win2k style */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					p: 1,
					backgroundColor: "#C0C0C0", // Slightly lighter gray than main
				}}
			>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					placeholder="Type a message..."
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSendMessage();
						}
					}}
					disabled={isLoading}
					// Force text color to black and remove modern MUI coloring
					inputProps={{
						style: {
							color: "#000", // Force black text
							fontSize: "small",
							cursor: "default !important",
						},
					}}
					sx={{
						mr: 1,
						// Flatten the fieldset and ensure no cyan/blue borders
						"& .MuiOutlinedInput-root": {
							borderRadius: 0,
							backgroundColor: "#fff",
							cursor: "default !important",
							"& fieldset": {
								borderColor: "#808080",
								// borderWidth: "1px",
							},
							"&:hover fieldset": {
								borderColor: "#808080",
								// borderColor: "#666666",
							},
							"&.Mui-focused fieldset": {
								// borderColor: "#333333",
							},
						},
						"& .MuiOutlinedInput-input::placeholder": {
							color: "#555",
						},
					}}
				/>
				<Button
					onClick={handleSendMessage}
					disabled={isLoading}
					sx={{
						// Classic Win2k button style
						fontSize: "0.7rem",
						minWidth: "50px",
						textTransform: "none",
						color: "#000",
						backgroundColor: "#E0E0E0",
						border: "1px solid #808080",
						borderRadius: 0,
						boxShadow: "none",
						padding: "2px 6px",
						cursor: "default !important", // preserve default cursor
						// Simulated 3D effect
						"&:hover": {
							backgroundColor: "#D8D8D8",
						},
						"&:active": {
							backgroundColor: "#D0D0D0",
							boxShadow: "inset 1px 1px 2px #FFF, inset -1px -1px 2px #808080",
						},
					}}
				>
					{isLoading ? "..." : "Send"}
				</Button>
			</Box>
		</Box>
	);
}
