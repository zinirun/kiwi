import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import BoardMainContainer from '../containers/BoardMainContainer';
import { GET_RECENT_POSTS, GET_BEST_POSTS } from '../../../configs/queries';
import { message } from 'antd';
import { BoardMainSkeleton } from '../components/Skeletons';
import moment from 'moment';
import { WEEK_BEST_POSTS, MONTH_BEST_POSTS } from '../../../configs/variables';

export default function BoardMainPage() {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [weekPosts, setWeekPosts] = useState(null);
    const [monthPosts, setMonthPosts] = useState(null);
    const { data, error, refetch, loading } = useQuery(GET_RECENT_POSTS);
    const {
        data: weekData,
        error: weekError,
        refetch: weekRefetch,
        loading: weekLoading,
    } = useQuery(GET_BEST_POSTS, {
        variables: {
            term: 7,
        },
    });

    const {
        data: monthData,
        error: monthError,
        refetch: monthRefetch,
        loading: monthLoading,
    } = useQuery(GET_BEST_POSTS, {
        variables: {
            term: new moment().daysInMonth(),
        },
    });

    useEffect(() => {
        if (weekData) {
            const posts = weekData.getPostsByLikeCountWithDay;
            setWeekPosts({
                ...WEEK_BEST_POSTS,
                posts,
            });
        }
        if (weekError) {
            message.error('메인페이지를 불러오는 중 오류가 발생했습니다.');
            history.push('/needsign');
        }
    }, [weekData, setWeekPosts, weekError, history]);

    useEffect(() => {
        if (monthData) {
            const posts = monthData.getPostsByLikeCountWithDay;
            setMonthPosts({
                ...MONTH_BEST_POSTS,
                posts,
            });
        }
        if (monthError) {
            message.error('메인페이지를 불러오는 중 오류가 발생했습니다.');
            history.push('/needsign');
        }
    }, [monthData, setMonthPosts, monthError, history]);

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
        refetch().catch(() => {});
    }, [refetch]);

    useEffect(() => {
        weekRefetch().catch(() => {});
    }, [weekRefetch]);

    useEffect(() => {
        monthRefetch().catch(() => {});
    }, [monthRefetch]);
    return (
        <>
            {(loading || weekLoading || monthLoading) && <BoardMainSkeleton />}
            {!loading && !weekLoading && !monthLoading && (
                <Grid container spacing={1}>
                    {monthPosts && (
                        <Grid item xs={12} sm={6}>
                            <BoardMainContainer data={monthPosts} noLink />
                        </Grid>
                    )}
                    {weekPosts && (
                        <Grid item xs={12} sm={6}>
                            <BoardMainContainer data={weekPosts} noLink />
                        </Grid>
                    )}
                    {posts.map((p, idx) => (
                        <Grid key={idx} item xs={12} sm={6}>
                            <BoardMainContainer data={p} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
