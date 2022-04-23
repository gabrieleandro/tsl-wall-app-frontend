import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from './contexts/AuthContext';

export default function FooterNavigation({value, setValue}) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Box
      elevation={3}
      sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Wall"
          value="/"
          icon={<NewspaperIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={isAuthenticated ? '/me' : '/signin'}
          label="Profile"
          value="/me"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Box>
  )
}
