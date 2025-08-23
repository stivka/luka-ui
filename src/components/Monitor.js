import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Application from "./Application";
import InternetExplorer from "./InternetExplorer";
import Minesweeper from "./Minesweeper";
import TurnOnNote from "./notes/TurnOnNote";
import DoomInstructionsNote from "./notes/DoomInstructionsNote";
import LevelTwoSticker from "./stickers/LevelTwoSticker";
import GameCompletedSticker from "./stickers/GameCompletedSticker";
import HundredKillsSticker from "./stickers/HundredKillsSticker";

const Apps = {
	Spotify: 'Spotify',
	YouTube: 'YouTube',
	Internet: 'Internet Explorer',
	Minesweeper: 'Minesweeper',
	Doom: 'Doom',
}

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
	const [zIndices, setZIndices] = useState([]);
	const [achievements] = useLocalStorage("parameters", {
		levelTwo: false,
		hundredKills: false,
		gameCompleted: false,
	});

	const isDoomRunning = zIndices.at(-1) === Apps.Doom;

	const handleApplicationFocus = (title) => typeof title === 'string' && setZIndices(
		previousValue => [...previousValue.filter(value => value !== title), title]
	);

	const handleApplicationClose = (title) => setZIndices(
		previousValue => previousValue.filter(value => value !== title)
	);

	const handleDoomFullscreen = () => {
		if (doomframeRef.current) {
			if (doomframeRef.current.requestFullscreen) {
				doomframeRef.current.requestFullscreen();
			} else if (doomframeRef.current.mozRequestFullScreen) {
				doomframeRef.current.mozRequestFullScreen();
			} else if (doomframeRef.current.webkitRequestFullscreen) {
				doomframeRef.current.webkitRequestFullscreen();
			} else if (doomframeRef.current.msRequestFullscreen) {
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
					title={Apps.Spotify}
					onFocus={handleApplicationFocus}
					onClose={handleApplicationClose}
					Icon={(props) => (
						<img src="/images/w2k_wmp_7.ico" {...props} alt={`${Apps.Spotify} Icon`} />
					)}
					sx={{
						height: 190,
						resize: "both",
						background: "#3C5B01",
						zIndex: zIndices.lastIndexOf(Apps.Spotify) + 1 || 1,
					}}
				>
					<iframe
						title={Apps.Spotify}
						src="https://open.spotify.com/embed/playlist/0zLzL0j1iLcujonECJc4MM?utm_source=generator"
						allow="encrypted-media"
						onFocus={() => handleApplicationFocus(Apps.Spotify)}
						style={iframeStyle}
					/>
				</Application>
				<Link to="/">
					<Box
						sx={{
							position: "absolute",
							top: "45px",
							left: "470px",
							cursor: "url(/images/cursor_64x64.png), pointer",
							"&:hover": {
								cursor: "url(/images/cursor_64x64.png), pointer",
							},
						}}
					>
						<img
							src="/favicon.svg"
							alt="Website"
							width="175%"
							style={{
								cursor: "url(/images/cursor_64x64.png), pointer",
							}}
						/>
					</Box>
				</Link>
				<Application
					title={Apps.YouTube}
					onFocus={handleApplicationFocus}
					onClose={handleApplicationClose}
					Icon={(props) => (
						<img src="/images/w2k_wmp_52.ico" {...props} alt={`${Apps.YouTube} Icon`} />
					)}
					sx={{
						height: 252,
						width: 400,
						zIndex: zIndices.lastIndexOf(Apps.YouTube) + 1 || 1,
					}}
				>
					<iframe
						title={Apps.YouTube}
						src="https://www.youtube.com/embed/X6c77l6SrUM?si=fuJAI_ZSznVLSSJi"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						style={{ aspectRatio: "16/9", ...iframeStyle }}
						allowFullScreen
					/>
				</Application>
				<Application
					title={Apps.Internet}
					onFocus={handleApplicationFocus}
					onClose={handleApplicationClose}
					Icon={(props) => (
						<img
							src="/images/wxp_512.ico"
							{...props}
							alt={`${Apps.Internet} Icon`}
						/>
					)}
					sx={{
						height: 486,
						width: 640,
						overflow: "auto",
						zIndex: zIndices.lastIndexOf(Apps.Internet) + 1 || 1,
					}}
				>
					<InternetExplorer style={iframeStyle} />
				</Application>
				<Application
					title={Apps.Minesweeper}
					onFocus={handleApplicationFocus}
					onClose={handleApplicationClose}
					Icon={(props) => (
						<img src="/images/minesweeper.webp" {...props} alt={`${Apps.Minesweeper} Icon`} />
					)}
					sx={{
						height: "fit-content",
						width: "fit-content",
						zIndex: zIndices.lastIndexOf(Apps.Minesweeper) + 1 || 1,
					}}
				>
					<Minesweeper />
				</Application>
				<Application
					title={Apps.Doom}
					onFocus={handleApplicationFocus}
					onClose={handleApplicationClose}
					onFullScreen={handleDoomFullscreen}
					Icon={(props) => (
						<img src="/images/doom.ico" {...props} alt={`${Apps.Doom} Icon`} />
					)}
					sx={{
						height: 426,
						width: 640,
						zIndex: zIndices.lastIndexOf(Apps.Doom) + 1 || 1,
					}}
				>
					<iframe
						ref={doomframeRef}
						title={Apps.Doom}
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
			{!switchedOn && <TurnOnNote />}
			{switchedOn && isDoomRunning && <DoomInstructionsNote />}
			{achievements.levelTwo && <LevelTwoSticker />}
			{achievements.gameCompleted && <GameCompletedSticker />}
			{achievements.hundredKills && <HundredKillsSticker />}
		</Box>
	);
};

export default Monitor;
