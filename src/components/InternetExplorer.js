import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";

const InternetExplorer = (props) => {
	const { iframeStyle } = props;
	const internetRef = useRef(null);
	const [inputMessage, setInputMessage] = useState("");
	const [history, setHistory] = useState(["https://www.neti.ee"]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSendMessage = async () => {
		let url = inputMessage;

		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			url = `https://${url}`;
		}

		try {
			new URL(url);
			internetRef.current.src = url;
			// Add new URL to history
			const newHistory = history.slice(0, currentIndex + 1);
			newHistory.push(url);
			setHistory(newHistory);
			setCurrentIndex(newHistory.length - 1);
		} catch (e) {
			console.error("Invalid URL:", url);
		}
	};

	const handleBack = () => {
		if (currentIndex > 0) {
			const newIndex = currentIndex - 1;
			setCurrentIndex(newIndex);
			internetRef.current.src = history[newIndex];
			setInputMessage(history[newIndex]);
		}
	};

	const handleForward = () => {
		if (currentIndex < history.length - 1) {
			const newIndex = currentIndex + 1;
			setCurrentIndex(newIndex);
			internetRef.current.src = history[newIndex];
			setInputMessage(history[newIndex]);
		}
	};

	return (
		<>
			<Box
				style={{
					display: "flex",
					gap: "8px",
					alignItems: "center",
				}}
			>
				<IconButton
					onClick={handleBack}
					disabled={currentIndex === 0}
					size="small"
					sx={{ cursor: "auto !important" }}
				>
					<ArrowBackIcon />
				</IconButton>
				<IconButton
					onClick={handleForward}
					disabled={currentIndex === history.length - 1}
					size="small"
				>
					<ArrowForwardIcon />
				</IconButton>
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
				/>
			</Box>
			<iframe
				ref={internetRef}
				title="Internet Explorer"
				src="https://www.neti.ee"
				height="484px"
				width="640px"
				allow="clipboard-write; encrypted-media;"
				style={{ aspectRatio: "4/3", ...iframeStyle }}
				allowFullScreen
			/>
		</>
	);
};

export default InternetExplorer;
