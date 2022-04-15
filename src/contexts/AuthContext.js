import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, } from "react-router-dom"
import useAxios from 'axios-hooks'
import jwt_decode from "jwt-decode";
import axios from '../services/axios';
import { useSnackbar } from "notistack";

import { useUser } from '../hooks/useUser';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [{ data }, refetch] = useUser();
  const isAuthenticated = !!user
  const [cookies, setCookie, removeCookie] = useCookies(['tslwallapp.token']);
  const navigate = useNavigate();
  const [{ data: userData, loading, error }, auth_user] = useAxios({
    url: '/token/',
    method: 'POST',
  }, { manual: true })
  const [{ getData, getLoading, getError }, register] = useAxios({
    url: '/users/',
    method: 'POST',
  }, { manual: true })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
      if (cookies['tslwallapp.token']) {
        const { user_id } = jwt_decode(cookies['tslwallapp.token'])
        // const userD = refetch(user_id)
        // console.log(userD)
        // setUser(userD)
      }
  }, [user])

  async function registerUser({
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password}) {
    try {
      const {data} = await register({data: {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password
      }})
      enqueueSnackbar('Account was created successfully! Now you can sign in and start posting.', {variant: 'success'});
      return navigate('/signin');
    } catch(error) {
      Object.entries(error.response.data).forEach(([key, value]) => {
        enqueueSnackbar(value, {variant: 'error'});
      });
    }
  }

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
    <AuthContext.Provider value={{ user, isAuthenticated, registerUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}