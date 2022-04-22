import { React, useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import useAxios from 'axios-hooks'
import { useSnackbar } from "notistack";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext'

const theme = createTheme();


export default function SignUpPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext)

  const [{ data, loading, error }, submitRegister] = useAxios({
    url: '/users/',
    method: 'POST',
  }, { manual: true });

  const { control, handleSubmit} = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  })

  async function handleRegisterUser({
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password}) {
    try {
      const {data} = await submitRegister({data: {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password
      }})
      enqueueSnackbar('Account was created successfully! Now you can sign in and start posting.', {variant: 'success'});
      return navigate('/signin');
    } catch(error) {
      Object.entries(error?.response.data).forEach(([key, value]) => {
        enqueueSnackbar(value, {variant: 'error'});
      });
    }
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
          <Box component="form" sx={{mt: 2}} onSubmit={handleSubmit(handleRegisterUser)} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="first_name"
                    control={control}
                    rules={{
                      required: 'First name is required.',
                    }}
                    render={({ field, fieldState: {error} }) => (<TextField
                      {...field}
                      required
                      fullWidth
                      label="First name"
                      error={!!error}
                      helperText={error? error.message : null}
                      autoFocus
                    />)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="last_name"
                    control={control}
                    rules={{
                      required: 'Last name is required.',
                    }}
                    render={({ field, fieldState: {error} }) => (<TextField
                      {...field}
                      required
                      fullWidth
                      label="Last name"
                      error={!!error}
                      helperText={error? error.message : null}
                    />)}
                  />
                </Grid>
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
                      helperText={error? error.message : null}
                    />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: 'Email is required.',
                    }}
                    render={({ field, fieldState: {error} }) => (<TextField
                      {...field}
                      required
                      fullWidth
                      type="email"
                      label="Email"
                      error={!!error}
                      helperText={error ? error.message : null}
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
                      autoComplete="password"
                    />)}
                  />
                </Grid>
                <Grid item xs={12}>
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
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoComplete="confirm_password"
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
