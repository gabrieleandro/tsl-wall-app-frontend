import { React, useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext'

const theme = createTheme();

export default function SignUpPage() {
  const navigate = useNavigate();
  const { isAuthenticated, registerUser } = useContext(AuthContext)
  const { control, handleSubmit} = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  })

  async function handleRegister(data) {
    await registerUser(data)
  }

  useEffect(() => {
    if (isAuthenticated) return navigate('/')
  }, [isAuthenticated])


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
          <Typography component="h1" variant="h5" align="center">
            Sign up to start posting messages.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleRegister)} sx={{ mt: 3 }} noValidate>
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
                helperText={error? error.message : null}
                autoFocus
              />)}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required.',
              }}
              render={({ field, fieldState: {error} }) => (<TextField
                {...field}
                margin="normal"
                required
                fullWidth
                type="email"
                label="Email"
                error={!!error}
                helperText={error ? error.message : null}
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
                autoComplete="password"
              />)}
            />
            <Controller
              name="confirm_password"
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
                  label="Confirm Password"
                  type="password"
                  error={!!error}
                  helperText={error ? error.message : null}
                  autoComplete="confirm_password"
                />)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Container align="center">
              <Link component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Container>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
