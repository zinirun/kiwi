import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Button, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../styles/board.style';
import { boardCommonStyles } from '../styles/board.common.style';
import SelectCategory from '../components/SelectCategory';
import { GET_POST_LIST, GET_POSTS_COUNT } from '../../../configs/queries';
import moment from 'moment';
import { Form, Input, message, Pagination, Space } from 'antd';
import NoResult from '../components/NoResult';
import { BoardListSkeleton } from '../components/Skeletons';
import { ITEMS_COUNT_PER_PAGE } from '../../../configs/variables';
import { commentTimeFormatter } from '../tools/formatter';

const { Search } = Input;

export default function BoardListContainer({ board, page }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [postList, setPostList] = useState([]);
    const [postsCount, setPostsCount] = useState();
    const [form] = Form.useForm();
    const { data: postsCountData, error: postsCountError, refetch: postCountRefetch } = useQuery(
        GET_POSTS_COUNT,
        {
            variables: {
                boardId: board.id,
                categoryId: selectedCategoryId,
            },
        },
    );
    const {
        data: postListData,
        error: postListError,
        loading: postListLoading,
        refetch: postListRefetch,
    } = useQuery(GET_POST_LIST, {
        variables: {
            boardId: board.id,
            categoryId: selectedCategoryId,
            pageNumber: page || 1,
            elementCount: ITEMS_COUNT_PER_PAGE,
        },
        skip: postsCount === 0,
    });

    useEffect(() => {
        if (postsCountData) {
            setPostsCount(postsCountData.getPostsCountByBoardId);
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
        postListRefetch().catch(() => {});
    }, [postListRefetch]);

    useEffect(() => {
        if (postListData) {
            setPostList(
                postListData.getPostsByBoardId.map((p) => {
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
        history.push(`/board/${board.link}?page=${page}`);
    };

    const handleSearchClick = () => {
        history.push(`/search/${board.link}`);
    };

    return (
        <>
            <Grid spacing={2} container justify="center" style={{ marginBottom: 15 }}>
                <Grid item xs={12} sm={10}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <SelectCategory
                                boardId={board.id}
                                value={selectedCategoryId}
                                setValue={setSelectedCategoryId}
                            />
                        </Grid>
                        <Grid item>
                            <Form form={form}>
                                <Form.Item name="search" noStyle>
                                    <Search
                                        name="search"
                                        className={classes.searchSection}
                                        placeholder="검색할 제목을 입력하세요"
                                        onClick={handleSearchClick}
                                    />
                                </Form.Item>
                            </Form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <Button
                        component={Link}
                        to={`/write?boardId=${board.id}`}
                        className={classes.button}
                        size="small"
                    >
                        글쓰기
                    </Button>
                </Grid>
            </Grid>
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
                                sm={10}
                                className={classes.title}
                                style={{ textDecoration: 'none' }}
                            >
                                <Space size={1} direction="vertical">
                                    <span style={{ color: 'black' }}>
                                        {post.categoryName && (
                                            <span className={classes.part}>
                                                {post.categoryName}
                                            </span>
                                        )}{' '}
                                        {post.title}
                                    </span>
                                    <span className={classes.infoWrapper}>
                                        {commentTimeFormatter(post.createdAt)}&nbsp;
                                        <span className={classes.author}>
                                            {post.gradeName}/{post.authorName}
                                        </span>
                                    </span>
                                </Space>
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
