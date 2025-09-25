import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const getEyeAngle = (cx, cy, ex, ey) => {
	const dy = ey - cy;
	const dx = ex - cx;
	const rad = Math.atan2(dy, dx);
	const deg = rad * (180 / Math.PI);
	return deg;
};

export default function CutoutEyes() {
	const faceRef = useRef(null);
	const leftEyeRef = useRef(null);
	const rightEyeRef = useRef(null);
	const [angleDeg, setAngleDeg] = useState(0);
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

	const rekt = faceRef.current?.getBoundingClientRect();
	const faceX = rekt ? rekt.x + rekt.width / 2 : 0;
	const faceY = rekt ? rekt.y + rekt.height / 2 : 0;

	const eyeStyle = (leftPercentage, topPercentage) => ({
		position: "absolute",
		left: `${leftPercentage}%`,
		top: `${topPercentage}%`,
		width: "5%", // Make the eye size responsive
		height: "auto",
		transform: `rotate(${angleDeg}deg)`,
		transformOrigin: "center center",
	});

	useEffect(() => {
		if (
			isMobile ||
			!faceRef.current ||
			!leftEyeRef.current ||
			!rightEyeRef.current
		)
			return;

		const handleMouseMove = (event) => {
			const mouseX = event.clientX;
			const mouseY = event.clientY;
			const deg = getEyeAngle(faceX, faceY, mouseX, mouseY);
			setAngleDeg(deg);
		};

		document.addEventListener("mousemove", handleMouseMove);

		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [isMobile, faceX, faceY]);

	return (
		// Box containing the eyes should have relative positioning,so that absolutely positioned elements inside would be
		// positioned relative to this Box.
		<Box sx={{ position: "relative", width: "100%", height: "auto" }}>
			<img
				src="/images/cutout-eyes-alt.png"
				alt="Eyes"
				ref={faceRef}
				style={{ width: "100%", height: "auto" }}
			/>
			{!isMobile && (
				<Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
					<img
						src="/images/eye.png"
						alt="Eye"
						style={eyeStyle(30, -58)} // Adjust these percentages based on the face image
						ref={leftEyeRef}
					/>
					<img
						src="/images/eye.png"
						alt="Eye"
						style={eyeStyle(80, -60)} // Adjust these percentages based on the face image
						ref={rightEyeRef}
					/>
				</Box>
			)}
		</Box>
	);
}
