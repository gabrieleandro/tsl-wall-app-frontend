import Box from '@mui/material/Box';
import useAxios from 'axios-hooks'

import PostItem from './PostItem'

export default function PostCollection(props) {
    const [{ data, loading, error }, refetch] = useAxios(
        'http://localhost:8000/api/posts/'
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (
        <Box sx={{ marginTop: 9 }}>
            {
                data.results.map((post) => (
                    <PostItem key={post.id} {...post} />
                ))
            }
        </Box>
    )
}
