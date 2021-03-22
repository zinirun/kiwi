import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { useStyles } from '../../board/common/styles/board.style';
import { boardCommonStyles } from '../../board/common/styles/board.common.style';
import moment from 'moment';
import { message, Pagination, Space } from 'antd';
import { GET_MY_COMMENTS, GET_MY_COMMENTS_COUNT } from '../../configs/queries';
import NoResult from '../../board/common/components/NoResult';
import { BoardListSkeleton } from '../../board/common/components/Skeletons';
import {
    DESKTOP_BOARD_HEAD_HEIGHT,
    DESKTOP_COMMENT_LIST_ELM_HEIGHT,
} from '../../configs/variables';

export default function MyCommentsContainer({ page }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const itemsByHeight = parseInt(
        (window.innerHeight - DESKTOP_BOARD_HEAD_HEIGHT) / DESKTOP_COMMENT_LIST_ELM_HEIGHT,
    );
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState();
    const { data: commentsCountData, error: commentsCountError } = useQuery(GET_MY_COMMENTS_COUNT);

    const {
        data: commentsData,
        error: commentsError,
        loading: commentsLoading,
        refetch: commentsRefetch,
    } = useQuery(GET_MY_COMMENTS, {
        variables: {
            pageNumber: page || 1,
            elementCount: itemsByHeight,
        },
        skip: commentsCount === 0,
    });

    useEffect(() => {
        if (commentsCountData) {
            setCommentsCount(commentsCountData.getMyCommentsCount);
        }
        if (commentsCountError) {
            message.error('댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [commentsCountData, commentsCountError, history]);

    useEffect(() => {
        commentsRefetch().catch(() => {});
    }, [commentsRefetch]);

    useEffect(() => {
        if (commentsData) {
            const comments = commentsData.getMyComments;
            setComments(
                comments.map((c) => {
                    return {
                        ...c,
                        createdAt: new moment(c.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (commentsError) {
            message.error('댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [commentsData, setComments, commentsError, history]);

    const handlePage = (page) => {
        history.push(`/my/comment?page=${page}`);
    };

    return (
        <>
            {commentsLoading && <BoardListSkeleton />}
            {!commentsLoading && comments.length === 0 && <NoResult title="내가 쓴 댓글" />}
            {!commentsLoading && (
                <>
                    {comments.map((comment, idx) => (
                        <Grid
                            container
                            justify="center"
                            spacing={0}
                            alignItems="center"
                            className={classes.postWrapper}
                            component={Link}
                            to={`/post/${comment.postId}`}
                            key={idx}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={10}
                                className={classes.title}
                                style={{ textDecoration: 'none' }}
                            >
                                <span style={{ color: 'black' }}>{comment.content}</span>
                            </Grid>
                            <Grid item xs={12} sm={2} align="right">
                                <Space direction="vertical" size={0}>
                                    <Chip
                                        className={classes.backColor}
                                        size="small"
                                        icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                                        label={comment.likeCount}
                                    />
                                    <Grid className={classes.date}>
                                        <span>{comment.createdAt}</span>
                                    </Grid>
                                </Space>
                            </Grid>
                        </Grid>
                    ))}
                    <Pagination
                        className={classes.paginationWrapper}
                        defaultCurrent={page || 1}
                        defaultPageSize={itemsByHeight}
                        total={commentsCount}
                        onChange={handlePage}
                        hideOnSinglePage
                        showSizeChanger={false}
                    />
                </>
            )}
        </>
    );
}
