import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function FooterNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Wall" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Profile" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
