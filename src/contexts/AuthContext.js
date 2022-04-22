import { createContext, useState } from "react";
import { useNavigate, } from "react-router-dom"
import { useSnackbar } from "notistack";
import { useAuthCookies } from '../hooks/useAuthCookies'

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const isAuthenticated = !!user
  const [cookies, setCookie, removeCookie] = useAuthCookies();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function signOut() {
    removeCookie('tslwallapp.token', {path:'/'})
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