import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import BoardMainContainer from '../containers/BoardMainContainer';
import { GET_RECENT_POSTS } from '../../../configs/queries';
import { message } from 'antd';

export default function BoardMainPage() {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const { data, error } = useQuery(GET_RECENT_POSTS);
    useEffect(() => {
        if (data) {
            setPosts(data.getRecentPosts);
        }
    }, [data, error, history]);
    return (
        <>
            <Grid container justify="center">
                {posts.map((p, idx) => (
                    <Grid key={idx} item xs={12} sm={6}>
                        <BoardMainContainer data={p} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
