import { useContext } from "react";
import SessionContext from "../contexts/SessionContext";

export const useSession = () => useContext(SessionContext);

export default useSession;
