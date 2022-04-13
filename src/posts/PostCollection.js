import Box from '@mui/material/Box';
import useAxios from 'axios-hooks'
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext'
import PostItem from './PostItem'

export default function PostCollection(props) {
    const [{ data, loading, error }, refetch] = useAxios('/posts/')
    const { user, isAuthenticated } = useContext(AuthContext)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (
        <Box sx={{ marginTop: 9 }}>
            {
                data.results.map((post) => (
                    <PostItem key={post.id} user={user} isAuthenticated={isAuthenticated} {...post} />
                ))
            }
        </Box>
    )
}
