import React from 'react';
import useAxios from 'axios-hooks'
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { blueGrey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from "notistack";
import { stringAvatar } from '../helpers.js'
export default function PostItem({ id, author, body, published_at, user, refreshPosts }) {
  const { enqueueSnackbar } = useSnackbar();

  const [{ delData, delLoading, delError }, deletePost] = useAxios({
    url: `/posts/${id}/`,
    method: 'DELETE',
  }, {manual: true})

  async function handleDelete(event) {
    try {
      await deletePost()
      enqueueSnackbar('Post removed successfully.', {variant: 'success'});
      refreshPosts()
    } catch(error)  {
      
    }
  }

  return (
    <Card variant="outlined" sx={{ m: 2, mt: 0 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: blueGrey[500] }}
            {...stringAvatar(`${author.first_name} ${author.last_name}`)}
          />
        }
        action={user && user.id === author.id && (
          <IconButton
            aria-label="remove"
            onClick={() => handleDelete()}
          >
            <DeleteIcon />
          </IconButton>)
        }
        title={
          <Typography>
            {author.username}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">{moment(published_at).fromNow()}</Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}
