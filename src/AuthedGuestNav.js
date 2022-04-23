import { React, useContext } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { AuthContext } from './contexts/AuthContext';
import AddIcon from '@mui/icons-material/Add';

export default function AuthedGuestNav() {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  
  const guestNav = (
    <Stack spacing={1} direction="row">
      <Button component={Link} to="/signup" size="small" color="inherit">Sign up</Button>
      <Button component={Link} to="/signin" size="small" variant="outlined" color="inherit">Sign in</Button>
    </Stack>
  );
  const authedNav = (
    <Stack spacing={1} direction="row">
      <Button onClick={() => signOut()} size="small" color="inherit">Sign out</Button>
    </Stack>
  );
  return isAuthenticated === true ? authedNav : guestNav;
}