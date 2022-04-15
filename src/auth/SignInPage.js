import { useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../contexts/AuthContext';


export default function SignInPage() {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useContext(AuthContext)

  const { control, handleSubmit} = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function handleSignIn(data) {
    await signIn(data)
  }

  useEffect(() => {
    if (isAuthenticated) return navigate('/')
  },[isAuthenticated])

  return (
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
          <Box component="form" onSubmit={handleSubmit(handleSignIn)} sx={{ mt: 2 }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                    required
                    fullWidth
                    label="Username"
                    error={!!error}
                    helperText={error ? error.message : null}
                    autoFocus
                  />)}
                />
              </Grid>
              <Grid item xs={12}>
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
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    error={!!error}
                    helperText={error ? error.message : null}
                    autoComplete="current-password"
                  />)}
                />
              </Grid>
            </Grid>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Container align="center">
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Container>
          </Box>
        </Box>
      </Container>
  );
}
