import { useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import useAxios from 'axios-hooks'
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../contexts/AuthContext'

export default function PostForm({refreshPosts}) {
  const { user, isAuthenticated } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar();
  const [{ data, loading, error }, submitPost] = useAxios({
    url: '/posts/',
    method: 'POST',
  }, {manual: true})

  const { control, handleSubmit} = useForm({
    defaultValues: {
      body: '',
    }
  })

  async function sendPost({body}) {
    try {
      await submitPost({data: {body}})
      enqueueSnackbar('Post sent.', {variant: 'success'});
      refreshPosts()
    } catch(error) {
      enqueueSnackbar(error, {variant: 'error'});
    }
  }

  return (
    <Box sx={{ marginTop: 8 }}>
      {isAuthenticated && (
        <Card variant="outlined" component="form" onSubmit={handleSubmit(sendPost)}
        noValidate sx={{m: 2, mb: 4}}>
          <CardContent>
          <Typography
            component="div"
            align="center"
            variant="overline"
            color="text.secondary"
            gutterBottom
          >
            Write a message
          </Typography>
            <Controller
              name="body"
              control={control}
              rules={{
                required: 'Please, write a message.',
              }}
              render={({ field, fieldState: {error} }) => (<TextField
                {...field}
                margin="normal"
                placeholder={`What's on your mind?`}
                required
                fullWidth
                multiline
                error={!!error}
                helperText={error? error.message : null}
                sx={{mb:2}}
                autoFocus
              />)}
            />
            <Grid container spacing={1}>
              <Grid item xs>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  loadingIndicator="Sending..."
                  disabled={loading}
                  variant="contained"
                  fullWidth
                >
                  Send message
                </LoadingButton>
              </Grid>
            </Grid>            
            </CardContent>
        </Card>
      )}
    </Box>
  )
}
