import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, } from "react-router-dom"
import useAxios from 'axios-hooks'
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const isAuthenticated = !!user;
    const [cookies, setCookie, removeCookie] = useCookies(['tslwallapp.token']);
    const navigate = useNavigate();
    const [{ data, loading, error }, auth_user] = useAxios({
        url: 'http://localhost:8000/api/token/',
        method: 'POST',
    }, { manual: true })

    async function signIn({username, password}) {
        const {data: {access: token}} = await auth_user({data: {
            username,
            password
        }})

        setCookie('tslwallapp.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour,
            sameSite: 'strict'
        })

        const { user_id } = jwt_decode(token)
        setUser({
            id: user_id,
            isAuthenticated: true,
        })

        return navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}