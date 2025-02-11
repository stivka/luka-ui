import { Box, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Application from "./Application";

const iframeStyle = {
	height: "calc(100% - 24px)",
	width: "100%",
	border: "none",
	frameBorder: "0",
	cursor: "pointer",
};

const Monitor = () => {
	const doomframeRef = useRef(null);
	const [switchedOn, setSwitchedOn] = useLocalStorage("monitor-on", false);
	const [zIndices, setZIndices] = useState({});

	const handleApplicationFocus = (title) => {
		const currentIndices = Object.values(zIndices);
		const maxZIndex = currentIndices.length ? Math.max(...currentIndices) : 0;
		setZIndices({ ...zIndices, [title]: maxZIndex + 1 });
	};

	const handleDoomFullscreen = () => {
		if (doomframeRef.current) {
			// Check if the browser supports the Fullscreen API
			if (doomframeRef.current.requestFullscreen) {
				doomframeRef.current.requestFullscreen();
			} else if (doomframeRef.current.mozRequestFullScreen) {
				// Firefox
				doomframeRef.current.mozRequestFullScreen();
			} else if (doomframeRef.current.webkitRequestFullscreen) {
				// Chrome, Safari, Opera
				doomframeRef.current.webkitRequestFullscreen();
			} else if (doomframeRef.current.msRequestFullscreen) {
				// IE/Edge
				doomframeRef.current.msRequestFullscreen();
			}
		}
	};

	return (
		<Box
			sx={{
				position: "relative",
				width: "fit-content",
				height: "fit-content",
				display: "flex",
				cursor: "auto",
			}}
		>
			<img
				src="/images/monitor.png"
				alt="Monitor"
				draggable={false}
				style={{ width: "auto", height: "95vh", cursor: "auto" }}
			/>
			<Box
				id="monitor-screen"
				sx={{
					p: "1px",
					position: "absolute",
					top: "10%",
					left: "10%",
					width: "80%",
					height: "59%",
					overflow: "hidden",
					backgroundImage: 'url("/images/screen.png")',
					backgroundSize: "cover",
					display: switchedOn ? "flex" : "none",
					gap: 2,
					flexDirection: "column",
					userSelect: "none",
					draggable: "false",
					cursor: "auto",
				}}
			>
				<Application
					title="Spotify"
					onFocus={() => handleApplicationFocus("Spotify")}
					Icon={(props) => (
						<img src="/images/w2k_wmp_7.ico" alt="Spotify Icon" {...props} />
					)}
					sx={{
						height: 190,
						resize: "both",
						background: "#3C5B01",
						zIndex: zIndices.Spotify || 1,
					}}
				>
					<iframe
						title="Spotify"
						src="https://open.spotify.com/embed/album/6kM9YkGOl27eV5U3rSO0BP"
						allow="encrypted-media"
						onFocus={() => handleApplicationFocus("Spotify")}
						style={iframeStyle}
					/>
				</Application>
				<Link to="/">
					<Box
						sx={{
							position: "absolute",
							top: "45px",
							left: "470px",
							cursor: "url(/images/cursor_128x128_hover.gif), pointer",
							"&:hover": {
								cursor: "url(/images/cursor_128x128_hover.gif), pointer",
							},
						}}
					>
						<img
							src="/favicon.svg"
							alt="Website"
							width="175%"
							style={{
								cursor: "url(/images/cursor_128x128_hover.gif), pointer",
							}}
						/>
					</Box>
				</Link>
				<Application
					title="YouTube"
					onFocus={() => handleApplicationFocus("YouTube")}
					Icon={(props) => (
						<img src="/images/w2k_wmp_52.ico" alt="YouTube Icon" {...props} />
					)}
					sx={{
						height: 252,
						width: 400,
						zIndex: zIndices.YouTube || 1,
					}}
				>
					<iframe
						title="YouTube video"
						src="https://www.youtube.com/embed/sCVycaNFAKU"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						style={{ aspectRatio: "16/9", ...iframeStyle }}
						allowFullScreen
					/>
				</Application>
				<Application
					title="Internet Explorer"
					onFocus={() => handleApplicationFocus("Internet")}
					Icon={(props) => (
						<img
							src="/images/wxp_512.ico"
							alt="Internet Explorer Icon"
							{...props}
						/>
					)}
					sx={{
						height: 486,
						width: 640,
						overflow: "auto",
						zIndex: zIndices.Internet || 1,
					}}
				>
					<iframe
						title="Internet Explorer"
						src="https://www.neti.ee"
						height="484px"
						width="640px"
						// height="480px"
						allow="clipboard-write; encrypted-media;"
						onFocus={() => handleApplicationFocus("Internet")}
						style={{ aspectRatio: "4/3", ...iframeStyle }}
						allowFullScreen
					/>
				</Application>
				<Application
					title="Doom"
					onFocus={() => handleApplicationFocus("Doom")}
					onFullScreen={handleDoomFullscreen}
					Icon={(props) => (
						<img src="/images/doom.ico" alt="Doom Icon" {...props} />
					)}
					sx={{
						height: 426,
						width: 640,
						zIndex: zIndices.Doom || 1,
					}}
				>
					<iframe
						ref={doomframeRef}
						title="Doom"
						src="doom/doom.html"
						allow="encrypted-media;"
						style={{ aspectRatio: "8/5", ...iframeStyle }}
						allowFullScreen
					/>
				</Application>
			</Box>
			<Box
				id="monitor-power-switch"
				onClick={() => setSwitchedOn(!switchedOn)}
				sx={{
					position: "absolute",
					top: "76.3%",
					left: "75.3%",
					width: "4%",
					height: "4%",
					cursor: "pointer",
				}}
			/>
			<Box
				id="monitor-power-indicator"
				sx={{
					position: "absolute",
					top: "77.9%",
					left: "73.1%",
					height: "0.8%",
					width: "0.8%",
					borderRadius: "50%",
					cursor: "unset",
					boxShadow: "inset 0 0 0.4px 0.1px #000000",
					backgroundColor: switchedOn ? "#9ee49efa" : "none",
				}}
			/>
			<Box
				id="monitor-sticky-note"
				sx={{
					position: "absolute",
					top: "77.9%",
					left: "82.1%",
					height: "12%",
					width: "14%",
					backgroundColor: "#e6db7c",
					color: "#555",
					py: 1,
					px: 2,
					fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
					borderRadius: 1,
					boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
					transform: "rotate(-2deg)",
				}}
			>
				<Typography variant="caption" align="center">
					Remember to turn me on ;)
				</Typography>
			</Box>
		</Box>
	);
};

export default Monitor;
