import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, } from "react-router-dom"
import useAxios from 'axios-hooks'

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const isAuthenticated = !!user;
    const [cookies, setCookie, removeCookie] = useCookies(['tslwallapp.cookie']);
    let navigate = useNavigate();
    const [{ data, loading, error }, auth_user] = useAxios({
        url: 'http://localhost:8000/api/token/',
        method: 'POST',
    }, { manual: true })

    async function signIn({username, password}) {
        const {data} = await auth_user({data: {
            username,
            password
        }})

        setCookie('tslwallapp.cookie', data.access)

        setUser(user)

        return navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}