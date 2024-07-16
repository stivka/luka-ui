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

	const setBoxShadow = (e) => {
		e.currentTarget.style.boxShadow =
			"0px 45px 20px -17px rgba(83, 201, 43, 0.6)";
	};

	const unsetBoxShadow = (e) => {
		e.currentTarget.style.boxShadow = "none";
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				cursor: "auto",
				background: "#f0f0f0",
			}}
		>
			<div style={{ cursor: "auto", textAlign: "center" }}>
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
						cursor: "auto",
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
						cursor: "auto",
					}}
				/>
				<button
					type="submit"
					onClick={handleLogin}
					style={{
						padding: 0,
						border: "none",
						background: "none",
						cursor: "pointer",
					}}
				>
					<img
						src="/login_button.png"
						alt="Login button"
						style={{
							width: "100%",
							height: "auto",
							cursor: "pointer",
							transition: "box-shadow 0.2s",
						}}
						onMouseOver={setBoxShadow}
						onMouseOut={unsetBoxShadow}
						onFocus={setBoxShadow}
						onBlur={unsetBoxShadow}
					/>
				</button>
			</div>
		</div>
	);
};

export default Login;
