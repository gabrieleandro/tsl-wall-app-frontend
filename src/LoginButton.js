import { React, useContext } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

export default function LoginButton() {
    const { isAuthenticated, signOut } = useContext(AuthContext);
    
    const logInButton = <Button component={Link} to="/signin" color="inherit">Sign in</Button>;
    const logOutButton = <Button onClick={() => signOut()} color="inherit">Sign out</Button>;
    return isAuthenticated === true ? logOutButton : logInButton;
}