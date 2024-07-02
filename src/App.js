import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import theme from "./theme"; // Ensure you have a theme file

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<Router>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/app" element={<MainApp />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Router>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
