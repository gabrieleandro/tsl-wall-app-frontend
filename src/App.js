import { React } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from './contexts/AuthContext';
import tslLogo from "./assets/tsl.png";
import FooterNavigation from './FooterNavigation'
import LoginButton from './LoginButton'

const theme = createTheme();

export default function App(props) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar variant="dense">
                <img
                  src={tslLogo}
                  alt="TSL"
                  width="32"
                  height="32"
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, ml: 2 }}
                >
                  TSL Wall App
                </Typography>
                <LoginButton />
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
      </AuthProvider>
    </CookiesProvider>
  );
}
