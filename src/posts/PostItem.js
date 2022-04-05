import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, lightBlue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function PostItem() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ m: 2, mt: 0 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
            G
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Gabriel Leandro"
        subheader="April 04, 2022"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Iusto laboriosam enim quam unde itaque dicta assumenda nihil 
          consequatur dolor veritatis est commodi esse voluptatibus 
          harum veniam quo obcaecati, vitae amet?
          🎉 
        </Typography>
      </CardContent>
    </Card>
  );
}
