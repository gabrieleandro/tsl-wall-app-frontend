import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import tslLogo from "./assets/tsl.png";


import FooterNavigation from './FooterNavigation'

const theme = createTheme();

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/posts/')
    .then(response => response.json())
    .then( data => {
      setCards(data.results)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <img
            src={tslLogo}
            alt="TSL"
            width="32"
            height="32"
          />
          <Typography
            sx={{ ml: 2 }}
            variant="h6"
            color="inherit"
            noWrap
          >
            TSL Wall App
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 4, mb: 6 }} component="footer">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Gabriel Leandro | TSL Wall App © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
      <FooterNavigation />
      {/* End footer */}
    </ThemeProvider>
  );
}
