import {Box} from "@mui/material";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Application from "./Application";
import {Link} from "react-router-dom";

const Monitor = () => {
	const [switchedOn, setSwitchedOn] = useLocalStorage("monitor-on", false);

	return (
		<Box
			sx={{
				position: "relative",
				width: "fit-content",
				height: "fit-content",
				display: "flex",
			}}
		>
			<img
				src="/images/monitor.png"
				alt="Monitor"
				draggable={false}
				style={{ width: "100%", height: "auto" }}
			/>
			<Box
				id="monitor-screen"
				sx={{
					p: 1,
					position: "absolute",
					top: "10%",
					left: "10%",
					width: "80%",
					height: "59%",
					overflow: "hidden",
					backgroundImage: 'url("/images/screen.png")',
					display: switchedOn ? "flex" : "none",
					flexDirection: "column"
				}}
			>
				<Application
					title="Spotify"
					Icon={(props) => (
						<img src="/images/w2k_wmp_7.ico" alt="Spotify Icon" {...props} />
					)}
					sx={{ backgroundColor: "spotifyDarkGrey.main", maxHeight: 180 }}
				>
					<iframe
						title="Spotify"
						src="https://open.spotify.com/embed/album/5VmKMLTrpNTaCjR8qxavz9"
						width="100%"
						height="152px"
						allow="encrypted-media"
						style={{ border: "none", frameBorder: "0" }}
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
					Icon={(props) => (
						<img src="/images/w2k_wmp_52.ico" alt="YouTube Icon" {...props} />
					)}
					sx={{ height: 248, width: 400, alignSelf: "flex-end" }}
				>
					<iframe
						title="YouTube video"
						src="https://www.youtube.com/embed/sCVycaNFAKU"
						width="100%"
						height="100%"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						style={{ border: "none", aspectRatio: "16/9" }}
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
					cursor: "pointer"
					,
				}}
			/>
			<Box
				id="monitor-power-indicator"
				sx={{
					position: "absolute",
					top: "77.9%",
					left: "73.1%",
					width: "0.8%",
					height: "0.8%",
					borderRadius: "50%",
					boxShadow: "inset 0 0 0.4px 0.1px #000000",
					backgroundColor: switchedOn ? "#9ee49efa" : "none",
				}}
			/>
		</Box>
	);
};

export default Monitor;
