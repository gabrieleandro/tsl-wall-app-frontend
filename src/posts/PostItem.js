import * as React from 'react';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function PostItem(post) {

  return (
    <Card sx={{ m: 2, mt: 0 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
            {post.author.split('')[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography>
            {post.author}
          </Typography>
        }
        subheader={
          <Link to={`/post/${post.id}`} variant="caption" color="text.secondary">{moment(post.published_at).fromNow()}</Link>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
