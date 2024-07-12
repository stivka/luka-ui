import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "./useSession";
import { paths } from "../paths";

/**
 * Hook for ensuring that the user is authenticated before rendering the component.
 * Will redirect the user to the login page if they are not authenticated.
 *
 * @returns {void}
 */
export const useEnsureSession = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useSession();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate(paths.login);
		}
	}, [isAuthenticated, navigate]);
};

export default useEnsureSession;
