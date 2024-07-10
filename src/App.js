import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import Screen from "./pages/Screen";
import { paths } from "./paths";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<SessionProvider>
					<Router>
						<Routes>
							<Route path={paths.login} element={<Login />} />
							<Route path={paths.index} element={<MainApp />} />
							<Route path={paths.monitor} element={<Screen />} />
							<Route path="*" element={<Navigate to={paths.index} />} />
						</Routes>
					</Router>
				</SessionProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
