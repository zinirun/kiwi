import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../../common/styles/board.style';
import { boardCommonStyles } from '../../common/styles/board.common.style';
import { GET_POSTS_BY_LIKE_COUNT, GET_TOP_POSTS_COUNT } from '../../../configs/queries';
import moment from 'moment';
import { message, Pagination } from 'antd';
import NoResult from '../../common/components/NoResult';
import { BoardListSkeleton } from '../../common/components/Skeletons';
import {
    TOP_BOARD_LIKE_COUNT,
    DESKTOP_BOARD_HEAD_HEIGHT,
    DESKTOP_BOARD_LIST_ELM_HEIGHT,
} from '../../../configs/variables';

export default function TopListContainer() {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [postsCount, setPostsCount] = useState();
    const [postList, setPostList] = useState([]);
    const itemsByHeight = parseInt(
        (window.innerHeight - DESKTOP_BOARD_HEAD_HEIGHT) / DESKTOP_BOARD_LIST_ELM_HEIGHT,
    );
    const { data: postsCountData, error: postsCountError } = useQuery(GET_TOP_POSTS_COUNT, {
        variables: {
            likeCount: TOP_BOARD_LIKE_COUNT,
        },
    });
    const {
        data: postListData,
        error: postListError,
        loading: postListLoading,
        refetch: postListRefetch,
        fetchMore,
    } = useQuery(GET_POSTS_BY_LIKE_COUNT, {
        variables: {
            likeCount: TOP_BOARD_LIKE_COUNT,
            pageNumber: 1,
            elementCount: itemsByHeight,
        },
        skip: postsCountData === 0,
    });

    useEffect(() => {
        if (postsCountData) {
            setPostsCount(postsCountData.getPostsCountByLikeCount);
        }
        if (postsCountError) {
            message.error('게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [postsCountData, postsCountError, history]);

    useEffect(() => {
        postListRefetch();
    }, [postListRefetch]);

    useEffect(() => {
        if (postListData) {
            setPostList(
                postListData.getPostsByLikeCount.map((p) => {
                    return {
                        ...p,
                        createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (postListError) {
            message.error('게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [postListData, setPostList, postListError, history]);

    const handlePage = (page) => {
        fetchMore({
            variables: {
                pageNumber: page,
            },
            updateQuery: (_, { fetchMoreResult }) => {
                const { getPostsByLikeCount: nextData } = fetchMoreResult;
                setPostList(
                    nextData.map((p) => {
                        return {
                            ...p,
                            createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
                        };
                    }),
                );
            },
        });
    };

    return (
        <>
            {postListLoading && <BoardListSkeleton />}
            {!postListLoading && postList.length === 0 && <NoResult />}
            {!postListLoading && postList.length > 0 && (
                <>
                    {postList.map((post, idx) => (
                        <Grid
                            container
                            justify="center"
                            spacing={0}
                            alignItems="center"
                            className={classes.postWrapper}
                            component={Link}
                            to={`/post/${post.id}`}
                            key={idx}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={7}
                                className={classes.title}
                                style={{ textDecoration: 'none' }}
                            >
                                {post.categoryName && (
                                    <span className={classes.part}>{post.categoryName}</span>
                                )}
                                {isMobile && <br />}
                                <span style={{ color: 'black' }}>{post.title}</span>
                            </Grid>

                            <Grid item xs={12} sm={2} align="right">
                                <Chip
                                    className={classes.backColor}
                                    size="small"
                                    icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                                    label={post.likeCount}
                                />
                                <Chip
                                    className={classes.backColor}
                                    size="small"
                                    icon={
                                        <ChatBubbleOutlineOutlinedIcon
                                            className={classes.commentIcon}
                                        />
                                    }
                                    label={post.commentCount}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} align="right">
                                <Grid>
                                    {post.companyName && (
                                        <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                            {post.companyName}/
                                        </span>
                                    )}
                                    <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                        {post.gradeName}&nbsp;
                                    </span>
                                    <span>{post.authorName}</span>
                                </Grid>
                                {!isMobile && (
                                    <Grid className={classes.date}>
                                        <span>{post.createdAt}</span>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    ))}
                    <Pagination
                        defaultPageSize={itemsByHeight}
                        total={postsCount}
                        onChange={handlePage}
                        hideOnSinglePage
                        showSizeChanger={false}
                    />
                </>
            )}
        </>
    );
}
