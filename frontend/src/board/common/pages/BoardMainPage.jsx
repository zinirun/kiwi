import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import BoardMainContainer from '../containers/BoardMainContainer';
import { GET_RECENT_POSTS } from '../../../configs/queries';
import { message } from 'antd';
import { BoardMainSkeleton } from '../components/Skeletons';

export default function BoardMainPage() {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const { data, error, refetch, loading } = useQuery(GET_RECENT_POSTS);
    useEffect(() => {
        if (data) {
            setPosts(data.getRecentPosts);
        }
        if (error) {
            message.error('메인페이지를 불러오는 중 오류가 발생했습니다.');
            history.push('/needsign');
        }
    }, [data, setPosts, error, history]);
    useEffect(() => {
        refetch();
    }, [refetch]);
    return (
        <>
            {loading && <BoardMainSkeleton />}
            <Grid container>
                {posts.map((p, idx) => (
                    <Grid key={idx} item xs={12} sm={6}>
                        <BoardMainContainer data={p} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
