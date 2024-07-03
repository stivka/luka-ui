import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

const VisitorCounter = () => {
	const [count, setCount] = useState(0);
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		console.log("Fetching visitor count from:", `${apiUrl}/visitor-count`);

		fetch(`${apiUrl}/visitor-count`)
			.then((response) => response.text())
			.then((data) => {
				setCount(Number(data));
			})
			.catch((error) => {});

		fetch(`${apiUrl}/visitor-count/increment`, {
			method: "POST",
		})
			.then((response) => response.text())
			.then((data) => {
				setCount(Number(data));
			})
			.catch((error) => {});
	}, [apiUrl]);

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
