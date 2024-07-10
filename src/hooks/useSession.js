import { useContext } from "react";
import SessionContext from "../contexts/SessionContext";

/**
 * Hook for accessing the session context.
 *
 * @returns {Object} Object containing the following properties:
 *   - isAuthenticated: Boolean indicating whether the user is authenticated
 *   - user: User object containing the user's username
 *   - login: Function to log in the user
 *   - logout: Function to log out the user
 */
export const useSession = () => useContext(SessionContext);

export default useSession;
