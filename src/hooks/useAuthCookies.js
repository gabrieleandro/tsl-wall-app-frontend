import { useCookies } from "react-cookie";

export function useAuthCookies() {
    return useCookies(['tslwallapp.token']);
}