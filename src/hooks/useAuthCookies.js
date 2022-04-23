import { useCookies } from "react-cookie";

export function useAuthCookies() {
    return useCookies([process.env.REACT_APP_COOKIE_NAME]);
}