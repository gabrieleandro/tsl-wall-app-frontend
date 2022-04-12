import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, } from "react-router-dom"
import useAxios from 'axios-hooks'
import jwt_decode from "jwt-decode";
import axios from '../services/axios'
import { useSnackbar } from "notistack";

export const AuthContext = createContext({});


export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const isAuthenticated = !!user
    const [cookies, setCookie, removeCookie] = useCookies(['tslwallapp.token']);
    const navigate = useNavigate();
    const [{ data, loading, error }, auth_user] = useAxios({
        url: '/token/',
        method: 'POST',
    }, { manual: true })
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (cookies['tslwallapp.token']) {
            const { user_id } = jwt_decode(cookies['tslwallapp.token'])
            setUser({
                id: user_id,
            })
        }
    })

    async function signIn({username, password}) {
        try {
            const {data: {access: token}} = await auth_user({data: {
                username,
                password
            }})

            setCookie('tslwallapp.token', token, {
                path: '/',
                maxAge: 60 * 60 * 1,
                sameSite: 'strict'
            })
            const { user_id } = jwt_decode(token)
            setUser({
                id: user_id,
            })
            return navigate('/');
        } catch(error) {
            enqueueSnackbar(error?.response.data.detail, {variant: 'error'});
        }
    }

    function signOut() {
        removeCookie('tslwallapp.token', {path:'/'})
        setUser()
        enqueueSnackbar('You have been logged out successfully.', {variant: 'success'});
        return navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}