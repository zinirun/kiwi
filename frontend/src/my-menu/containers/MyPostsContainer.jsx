import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../../board/common/styles/board.style';
import { boardCommonStyles } from '../../board/common/styles/board.common.style';
import moment from 'moment';
import { message, Pagination, Space } from 'antd';
import { GET_MY_POSTS, GET_MY_POSTS_COUNT } from '../../configs/queries';
import NoResult from '../../board/common/components/NoResult';
import { BoardListSkeleton } from '../../board/common/components/Skeletons';
import { DESKTOP_BOARD_HEAD_HEIGHT, DESKTOP_BOARD_LIST_ELM_HEIGHT } from '../../configs/variables';

export default function MyPostsContainer() {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [postList, setPostList] = useState([]);
    const [postsCount, setPostsCount] = useState();
    const itemsByHeight = parseInt(
        (window.innerHeight - DESKTOP_BOARD_HEAD_HEIGHT) / DESKTOP_BOARD_LIST_ELM_HEIGHT,
    );
    const { data: postsCountData, error: postsCountError } = useQuery(GET_MY_POSTS_COUNT);
    const {
        data: postListData,
        error: postListError,
        loading: postListLoading,
        refetch: postListRefetch,
        fetchMore,
    } = useQuery(GET_MY_POSTS, {
        variables: {
            pageNumber: 1,
            elementCount: itemsByHeight,
        },
    });

    useEffect(() => {
        if (postsCountData) {
            setPostsCount(postsCountData.getMyPostsCount);
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
            const posts = postListData.getMyPosts;
            setPostList(
                posts.map((p) => {
                    return {
                        ...p,
                        createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (postListError) {
            message.error('게시글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [postListData, setPostList, postListError, history, itemsByHeight]);

    const handlePage = (page) => {
        fetchMore({
            variables: {
                pageNumber: page,
            },
            updateQuery: (_, { fetchMoreResult }) => {
                const { getMyPosts: nextData } = fetchMoreResult;
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
            {!postListLoading && postList.length === 0 && <NoResult title="나의 게시글" />}

            {!postListLoading && (
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
                                sm={10}
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
                                <Space direction="vertical" size={0}>
                                    <div>
                                        <Chip
                                            className={classes.backColor}
                                            size="small"
                                            icon={
                                                <ThumbUpOutlinedIcon className={classes.upIcon} />
                                            }
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
                                    </div>
                                    <Grid className={classes.date}>
                                        <span>{post.createdAt}</span>
                                    </Grid>
                                </Space>
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
