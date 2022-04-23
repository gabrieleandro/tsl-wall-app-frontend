import { React, useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './contexts/AuthContext';
import tslLogo from "./assets/tsl.png";
import FooterNavigation from './FooterNavigation'
import AuthedGuestNav from './AuthedGuestNav'

const theme = createTheme();

export default function App(props) {
  const [value, setValue] = useState((typeof window !== "undefined") ? window.location.pathname : null);

  return (
    <SnackbarProvider>
      <CookiesProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed">
              <Toolbar variant="dense" sx={{maxWidth: 1140,width: "100%", margin: "0 auto",}}>
                <Stack
                  component={Link}
                  to="/"
                  spacing={2}
                  direction="row"
                  color="inherit"
                  sx={{ flexGrow: 1, ml: 2, textDecoration: 'none' }}
                >
                  <img
                    src={tslLogo}
                    alt="TSL"
                    width="32"
                    height="32"
                  />
                  <Typography
                    variant="h6"
                  >
                    TSL Wall App
                  </Typography>
                </Stack>
                <AuthedGuestNav />
              </Toolbar>
            </AppBar>
            <Box sx={{maxWidth: 1140,width: "100%", margin: "0 auto",}}>
              <Outlet />
            </Box>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 4, mb: 6 }} component="footer">
              <Typography variant="body2" color="text.secondary" align="center">
                {'Gabriel Leandro | TSL Wall App © '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
            <FooterNavigation value={value} setValue={setValue} />
            {/* End footer */}
          </ThemeProvider>
        </AuthProvider>
      </CookiesProvider>
    </SnackbarProvider>
  );
}
