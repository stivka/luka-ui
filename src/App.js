import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Screen from "./Screen";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import theme from "./theme"; // Ensure you have a theme file

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/app" element={<MainApp />} />
					<Route path="/computer" element={<Screen />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
