import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession";
import { paths } from "../paths";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useSession();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		if (username && password) {
			await login({ username, password });
			navigate(paths.index);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				background: "#f0f0f0",
			}}
		>
			<div>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					style={{
						display: "block",
						margin: "10px 0",
						padding: "10px",
						width: "100%",
					}}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{
						display: "block",
						margin: "10px 0",
						padding: "10px",
						width: "100%",
					}}
				/>
				<button
					type="submit"
					onClick={handleLogin}
					style={{
						display: "block",
						margin: "20px auto",
						padding: "10px 20px",
						background: "#a1e44d",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					LOGIN!
				</button>
			</div>
		</div>
	);
};

export default Login;
