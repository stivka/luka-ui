import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const initialState = {
	isAuthenticated: false,
	user: null,
};

export const SessionContext = createContext({
	...initialState,
	login: () => Promise.resolve(),
	logout: () => Promise.resolve(),
});

export const SessionProvider = ({ children }) => {
	const [session, setSession] = useLocalStorage("session", null);
	const isAuthenticated = !!session;
	const user = session?.username ?? null;

	const login = async (credentials) => {
		setSession({
			username: credentials.username,
			password: credentials.password,
		});
	};

	const logout = () => setSession(null);

	return (
		<SessionContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</SessionContext.Provider>
	);
};

export const SessionConsumer = SessionContext.Consumer;

export default SessionContext;
