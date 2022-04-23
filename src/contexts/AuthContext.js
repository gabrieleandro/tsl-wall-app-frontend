import { createContext, useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom"
import { useSnackbar } from "notistack";
import jwtDecode from "jwt-decode";
import { useAuthCookies } from '../hooks/useAuthCookies'

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const isAuthenticated = !!user
  const [cookies, setCookie, removeCookie] = useAuthCookies();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies[process.env.REACT_APP_COOKIE_NAME]) {
      const token = cookies[process.env.REACT_APP_COOKIE_NAME]
      const { user_id: userId } = jwtDecode(token)
      setUser({
        id: userId,
      })
    }    
  }, [cookies])

  function signOut() {
    removeCookie(process.env.REACT_APP_COOKIE_NAME, {path:'/'})
    setUser()
    enqueueSnackbar('You have been logged out successfully.', {variant: 'success'});
    return navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}