import { React, useContext } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

export default function LoginButton() {
    const { isAuthenticated, signOut } = useContext(AuthContext);
    
    let loginButton = <Button component={Link} to="/signin" color="inherit">Login</Button>;
    if(isAuthenticated === true) {
        loginButton = <Button onClick={() => signOut()} color="inherit">Logout</Button>;
    }
    return loginButton;
}