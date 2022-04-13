import { useContext } from 'react';
import useAxios from 'axios-hooks'
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AuthContext } from '../contexts/AuthContext'
import PostItem from './PostItem'

export default function PostCollection(props) {
  const [{ data, loading, error }, refetch] = useAxios('/posts/')
  const { user, isAuthenticated } = useContext(AuthContext)
  const { control, handleSubmit} = useForm({
    defaultValues: {
      body: '',
    }
  })

  async function handleSendMessage(data) {
    console.log(data)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Box sx={{ marginTop: 8 }}>
      {isAuthenticated && (
        <Card variant="outlined" component="form" onSubmit={handleSubmit(handleSendMessage)}
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
                placeholder="What's on your mind?"
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
                <Button type="submit" variant="contained" fullWidth>Send message</Button>
              </Grid>
            </Grid>            
            </CardContent>
        </Card>
      )}
      <Typography align="center" variant="overline" color="text.secondary" gutterBottom component="div">
        Wall messages
      </Typography>
      {
        data.results.map((post) => (
          <PostItem key={post.id} user={user} isAuthenticated={isAuthenticated} {...post} />
        ))
      }
    </Box>
  )
}
