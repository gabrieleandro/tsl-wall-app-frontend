import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignIn() {
  const { control, handleSubmit} = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const handleSignIn = data => console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is required.',
                minLength: {
                  value: 6,
                  message: 'Please enter at least 6 characters.'
                },
                maxLength: {
                  value: 30,
                  message: 'Please enter no more than 30 characters.'
                }
              }}
              render={({ field, fieldState: {error} }) => (<TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  error={!!error}
                  helperText={error ? error.message : null}
                  autoFocus
                />)}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'Please enter at least 6 characters.'
                }
              }}
              render={({ field, fieldState: {error} }) => (<TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  error={!!error}
                  helperText={error ? error.message : null}
                  autoComplete="current-password"
                />)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
