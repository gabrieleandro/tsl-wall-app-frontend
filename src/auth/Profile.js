import { React, useContext, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import moment from 'moment';
import useAxios from 'axios-hooks'
import { blueGrey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../contexts/AuthContext'
import { stringAvatar } from '../helpers.js'

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useContext(AuthContext)
  const userId = user && user.id
  const emptyUser = {
    username: '',
    first_name: '',
    last_name: '',
    date_joined: ''
  }
  const [{ data: profile=emptyUser, loading, error }, getUser] = useAxios({
    url:`/users/${userId}/`
  }, {
    manual: !userId
  })

  useEffect(() => {
    if (!isAuthenticated) return navigate('/')
  }, [isAuthenticated])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar
        sx={{ marginBottom: 2, bgcolor: blueGrey[500], fontSize: 32, width: 75, height: 75 }}
        {...stringAvatar(`${profile.first_name} ${profile.last_name}`)}
      />
      <Typography component="div" variant="h5" align="center">
        {`${profile.first_name} ${profile.last_name}`}
      </Typography>
      <Typography component="div" variant="subtitle1" align="center">
        {profile.email}
      </Typography>
      <Typography component="div" variant="subtitle2" align="center">
        {`Joined in ${moment(profile.date_joined).format('LL')}`}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button
          onClick={() => signOut()}
          size="small"
          variant="outlined"
          color="inherit"
          fullWidth
        >
          Sign out
        </Button>
      </Box>
    </Box>
  );
}
