import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ReloadOutlined } from '@ant-design/icons';
import { Grid, Button, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../styles/board.style';
import { boardCommonStyles } from '../styles/board.common.style';
import SelectCategory from '../components/SelectCategory';
import { GET_POST_LIST, SEARCH_POST_LIST } from '../../../configs/queries';
import moment from 'moment';
import { Form, Input, message, Tooltip } from 'antd';
import NoResult from '../components/NoResult';
import { BoardListSkeleton } from '../components/Skeletons';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    DESKTOP_BOARD_HEAD_HEIGHT,
    DESKTOP_BOARD_LIST_ELM_HEIGHT,
} from '../../../configs/variables';

const { Search } = Input;

export default function BoardListContainer({ boardId }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [postList, setPostList] = useState([]);
    const [form] = Form.useForm();
    const [postListBeforeSearch, setPostListBeforeSearch] = useState(null);
    const [isSearched, setIsSearched] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchPostsByBoardId] = useMutation(SEARCH_POST_LIST);
    const {
        data: postListData,
        error: postListError,
        loading: postListLoading,
        refetch: postListRefetch,
        fetchMore,
    } = useQuery(GET_POST_LIST, {
        variables: {
            boardId: boardId,
            categoryId: selectedCategoryId,
            pageNumber: 1,
            elementCount: parseInt(
                (window.innerHeight - DESKTOP_BOARD_HEAD_HEIGHT) / DESKTOP_BOARD_LIST_ELM_HEIGHT,
            ),
        },
    });
    useEffect(() => {
        postListRefetch();
    }, [selectedCategoryId, postListRefetch]);

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
            setPostListBeforeSearch(
                postListData.getPostsByBoardId.map((p) => {
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

    const onSearch = useCallback(
        (value) => {
            if (value.length < 2) {
                return message.error('검색어를 두 글자 이상 입력하세요.');
            }
            searchPostsByBoardId({
                variables: {
                    boardId,
                    searchValue: '%' + value + '%',
                },
            })
                .then(({ data }) => {
                    setSelectedCategoryId('');
                    form.resetFields();
                    setIsSearched(true);
                    setPostList(
                        data.searchPostsByBoardId.map((p) => {
                            return {
                                ...p,
                                createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
                            };
                        }),
                    );
                })
                .catch(() => {
                    message.error('게시글 검색 중 오류가 발생했습니다.');
                });
        },
        [boardId, form, searchPostsByBoardId],
    );

    const handleReloadClick = useCallback(() => {
        message.success('검색 결과가 초기화되었습니다.');
        setIsSearched(false);
        setPostList(postListBeforeSearch);
    }, [postListBeforeSearch]);

    const onLoadMore = () => {
        if (isSearched) return;
        if (
            postList.length <
            parseInt(
                (window.innerHeight - DESKTOP_BOARD_HEAD_HEIGHT) / DESKTOP_BOARD_LIST_ELM_HEIGHT,
            )
        ) {
            setHasMore(false);
            return;
        }
        fetchMore({
            variables: {
                pageNumber:
                    parseInt(
                        postList.length /
                            parseInt(
                                (window.innerHeight - DESKTOP_BOARD_HEAD_HEIGHT) /
                                    DESKTOP_BOARD_LIST_ELM_HEIGHT,
                            ),
                    ) + 1,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                const { getPostsByBoardId: moreData } = fetchMoreResult;
                if (moreData.length === 0) {
                    setHasMore(false);
                    return prev;
                }
                setPostList(
                    postList.concat(
                        moreData.map((p) => {
                            return {
                                ...p,
                                createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
                            };
                        }),
                    ),
                );
            },
        });
    };

    return (
        <>
            <Grid spacing={2} container justify="center" style={{ marginBottom: 15 }}>
                <Grid item xs={12} sm={10}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <SelectCategory
                                boardId={boardId}
                                value={selectedCategoryId}
                                setValue={setSelectedCategoryId}
                            />
                        </Grid>
                        <Grid item>
                            <Form form={form}>
                                <Form.Item name="search" style={{ marginBottom: 0 }}>
                                    <Search
                                        name="search"
                                        className={classes.searchSection}
                                        placeholder="검색할 제목을 입력하세요"
                                        onSearch={onSearch}
                                        suffix={
                                            <Tooltip title="검색 결과 초기화">
                                                <ReloadOutlined onClick={handleReloadClick} />
                                            </Tooltip>
                                        }
                                    />
                                </Form.Item>
                            </Form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <Button
                        component={Link}
                        to={`/write?boardId=${boardId}`}
                        className={classes.button}
                        size="small"
                    >
                        글쓰기
                    </Button>
                </Grid>
            </Grid>
            {postListLoading && <BoardListSkeleton />}
            {!postListLoading && postList.length === 0 && <NoResult />}
            <InfiniteScroll
                dataLength={postList.length}
                next={onLoadMore}
                hasMore={hasMore}
                loader={<BoardListSkeleton />}
            >
                {!postListLoading &&
                    postList.map((post, idx) => (
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
            </InfiniteScroll>
        </>
    );
}
