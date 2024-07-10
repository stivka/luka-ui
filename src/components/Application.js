import { Box } from "@mui/material";
import React, { useState } from "react";
import useDrag from "../hooks/useDrag";

const Application = ({ title, Icon, children, sx }) => {
	const [isRunning, setIsRunning] = useState(true);
	const { ref, position, startDragging } = useDrag();

	if (!isRunning) {
		return (
			<Icon
				onClick={() => setIsRunning(true)}
				style={{ height: 48, width: 48, cursor: "pointer" }}
			/>
		);
	}

	return (
		<Box
			id={`${title}-application`}
			ref={ref}
			sx={{
				width: 400,
				height: 300,
				resize: "both",
				overflow: "auto",
				border: "2px solid #C0C0C0",
				boxShadow: "2px 2px #888888",
				backgroundColor: "#C0C0C0",
				fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
				transform: `translateX(${position.x}px) translateY(${position.y}px)`,
				...sx,
			}}
		>
			<Box
				id={`${title}-application-header`}
				onPointerDown={startDragging}
				sx={{
					px: 0.25,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: "#000080",
					color: "#fff",
					cursor: "move",
					borderBottom: "2px solid #000",
				}}
			>
				<Box sx={{ fontSize: 14, fontWeight: 600 }}>{title}</Box>
				<Box
					id={`${title}-application-close-button`}
					onClick={() => setIsRunning(false)}
					sx={{
						pb: 0.5,
						width: 18,
						height: 18,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						cursor: "pointer",
						color: "#000000",
						backgroundColor: "#C0C0C0",
						boxShadow: "1px 1px #000000, inset 1px 1px  #FFFFFF",
					}}
				>
					x
				</Box>
			</Box>
			<Box id={`${title}-application-content`}>{children}</Box>
		</Box>
	);
};

export default Application;
