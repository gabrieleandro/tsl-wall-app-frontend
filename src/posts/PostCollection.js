import { useState, useContext } from 'react';
import useAxios from 'axios-hooks'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../contexts/AuthContext'
import PostItem from './PostItem'
import PostForm from './PostForm'


export default function PostCollection(props) {
  const [{ data, loading, error }, refetch] = useAxios('posts/')
  const { user, isAuthenticated } = useContext(AuthContext)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Box sx={{ marginTop: 7 }}>
      <PostForm />
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
