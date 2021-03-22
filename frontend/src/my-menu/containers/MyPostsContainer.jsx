import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { useStyles } from '../../board/common/styles/board.style';
import { boardCommonStyles } from '../../board/common/styles/board.common.style';
import moment from 'moment';
import { message, Pagination } from 'antd';
import { GET_MY_POSTS, GET_MY_POSTS_COUNT } from '../../configs/queries';
import NoResult from '../../board/common/components/NoResult';
import { BoardListSkeleton } from '../../board/common/components/Skeletons';
import { ITEMS_COUNT_PER_PAGE } from '../../configs/variables';
import { commentTimeFormatter } from '../../board/common/tools/formatter';

export default function MyPostsContainer({ page }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [postList, setPostList] = useState([]);
    const [postsCount, setPostsCount] = useState();

    const { data: postsCountData, error: postsCountError } = useQuery(GET_MY_POSTS_COUNT);
    const {
        data: postListData,
        error: postListError,
        loading: postListLoading,
        refetch: postListRefetch,
    } = useQuery(GET_MY_POSTS, {
        variables: {
            pageNumber: page || 1,
            elementCount: ITEMS_COUNT_PER_PAGE,
        },
    });

    useEffect(() => {
        if (postsCountData) {
            setPostsCount(postsCountData.getMyPostsCount);
        }
        if (postsCountError) {
            message.error('게시글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [postsCountData, postsCountError, history]);

    useEffect(() => {
        postListRefetch().catch(() => {});
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
    }, [postListData, setPostList, postListError, history]);

    const handlePage = (page) => {
        history.push(`/my/post?page=${page}`);
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
                            className={classes.postWrapper}
                            component={Link}
                            to={`/post/${post.id}`}
                            key={idx}
                        >
                            <Grid item className={classes.title} xs={12}>
                                <span style={{ color: 'black' }}>
                                    {post.categoryName && (
                                        <span className={classes.part}>{post.categoryName}</span>
                                    )}
                                    {post.title}
                                </span>
                            </Grid>
                            <Grid
                                container
                                style={{ flexWrap: 'wrap', justifyContent: 'space-around' }}
                            >
                                <Grid item style={{ flex: 1 }}>
                                    <span className={classes.infoWrapper}>
                                        {commentTimeFormatter(post.createdAt)}
                                    </span>
                                </Grid>
                                <Grid item>
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
                            </Grid>
                        </Grid>
                    ))}
                    <Pagination
                        className={classes.paginationWrapper}
                        defaultCurrent={page || 1}
                        defaultPageSize={ITEMS_COUNT_PER_PAGE}
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
