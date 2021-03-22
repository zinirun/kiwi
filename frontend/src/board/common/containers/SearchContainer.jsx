import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Button, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../styles/board.style';
import { boardCommonStyles } from '../styles/board.common.style';
import { GET_SEARCH_POSTS_COUNT, SEARCH_POST_LIST } from '../../../configs/queries';
import moment from 'moment';
import { Form, Input, message, Pagination } from 'antd';
import NoResult from '../components/NoResult';
import {
    DESKTOP_BOARD_HEAD_HEIGHT,
    DESKTOP_BOARD_LIST_ELM_HEIGHT,
} from '../../../configs/variables';
import { BoardListSkeleton } from '../components/Skeletons';

const { Search } = Input;

export default function SearchContainer({ board, page, value }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [postsCount, setPostsCount] = useState();
    const [postList, setPostList] = useState([]);
    const [form] = Form.useForm();
    const itemsByHeight = parseInt(
        (window.innerHeight - DESKTOP_BOARD_HEAD_HEIGHT) / DESKTOP_BOARD_LIST_ELM_HEIGHT,
    );
    const { data: postsCountData, error: postsCountError, refetch: postCountRefetch } = useQuery(
        GET_SEARCH_POSTS_COUNT,
        {
            variables: {
                boardId: board.id,
                searchValue: '%' + value + '%',
            },
        },
    );
    const { data: postListData, error: postListError, loading: postListLoading } = useQuery(
        SEARCH_POST_LIST,
        {
            variables: {
                boardId: board.id,
                searchValue: '%' + value + '%',
                pageNumber: page || 1,
                elementCount: itemsByHeight,
            },
            skip: value && value.length < 2,
        },
    );

    useEffect(() => {
        if (postsCountData) {
            setPostsCount(postsCountData.getSearchPostsCount);
        }
        if (postsCountError) {
            message.error('게시글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [postsCountData, postsCountError, history]);

    useEffect(() => {
        postCountRefetch().catch(() => {});
    }, [postCountRefetch]);

    useEffect(() => {
        if (postListData) {
            setPostList(
                postListData.searchPostsByBoardId.map((p) => {
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

    const onSearch = useCallback(
        (value) => {
            if (value.length < 2) {
                return message.error('검색어를 두 글자 이상 입력하세요.');
            }
            history.push(`/search/${board.link}?value=${value}`);
        },
        [board.link, history],
    );

    const handlePage = (page) => {
        history.push(`/search/${board.link}?value=${value}&page=${page}`);
    };

    return (
        <>
            <Grid spacing={2} container justify="center" style={{ marginBottom: 15 }}>
                <Grid item xs={12} sm={10}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Form form={form}>
                                <Form.Item name="search" noStyle>
                                    <Search
                                        name="search"
                                        className={classes.searchSection}
                                        placeholder="검색할 제목을 입력하세요"
                                        autoFocus
                                        onSearch={onSearch}
                                    />
                                </Form.Item>
                            </Form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <Button
                        component={Link}
                        to={`/board/${board.link}`}
                        className={classes.button}
                        size="small"
                    >
                        {board.boardName}
                    </Button>
                </Grid>
            </Grid>
            {postListLoading && <BoardListSkeleton />}
            {!postListLoading && value && postList.length === 0 && (
                <NoResult title={'검색된 내용'} />
            )}
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
                        className={classes.paginationWrapper}
                        defaultCurrent={page || 1}
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
