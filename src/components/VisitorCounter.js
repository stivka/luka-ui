import { Box } from "@mui/material";
import React from "react";
import { useGetVisitorCount } from "../providers/backendApi";

const VisitorCounter = () => {
	const { data: count } = useGetVisitorCount();

	return (
		<Box
			sx={{
				position: "absolute",
				top: 0,
				left: 0,
				width: 260,
				height: 100,
				backgroundImage: `url("/muuse.png")`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "contain",
				fontFamily: "'Margarine', sans-serif",
			}}
		>
			<Box
				sx={{
					position: "absolute",
					top: "69%",
					left: "60%",
					transform: "translate(-50%, -50%)",
					color: "#FF6301",
					fontSize: 22,
					fontWeight: 800,
					lineHeight: 1.2,
					letterSpacing: "0.4em",
					textTransform: "uppercase",
					textShadow: "1.3px -1px 0px #A33D07",
				}}
			>
				{count}
			</Box>
			<img
				src="/visitor-count-sign.png"
				alt="Muuse"
				style={{
					width: "48%",
					height: "auto",
					position: "absolute",
					top: "6%",
					left: "40%",
				}}
			/>
		</Box>
	);
};

export default VisitorCounter;
