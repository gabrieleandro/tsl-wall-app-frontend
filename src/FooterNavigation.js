import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import { AuthContext } from './contexts/AuthContext';

export default function FooterNavigation() {
  const [value, setValue] = React.useState(0);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    isAuthenticated && <Box
      elevation={3}
      sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' }
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
          icon={<NewspaperIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Write a post"
          icon={<CreateIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/signin"
          label="Profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
