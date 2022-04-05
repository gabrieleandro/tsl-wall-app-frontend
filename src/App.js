import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import tslLogo from "./assets/tsl.png";

import PostItem from './posts/PostItem'
import FooterNavigation from './FooterNavigation'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Gabriel Leandro | TSL Wall App © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();

export default function App() {
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
      <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        {
          cards.map((card) => (
            <PostItem />
          ))
        }
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 4, mb: 6 }} component="footer">
        <Copyright />
      </Box>
      <FooterNavigation />
      {/* End footer */}
    </ThemeProvider>
  );
}
