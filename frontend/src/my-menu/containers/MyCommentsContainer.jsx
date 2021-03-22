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
import { ITEMS_COUNT_PER_PAGE } from '../../configs/variables';
import { commentTimeFormatter } from '../../board/common/tools/formatter';

export default function MyCommentsContainer({ page }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
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
            elementCount: ITEMS_COUNT_PER_PAGE,
        },
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
        window.scrollTo(0, 0);
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
                    {comments.map((comment) => (
                        <Grid
                            container
                            spacing={0}
                            className={classes.commentWrapper}
                            justify="center"
                            alignItems="center"
                            component={Link}
                            to={`/post/${comment.postId}`}
                            key={`comment-${comment.id}`}
                        >
                            <Grid item style={{ flex: 1 }} className={classes.title}>
                                <span style={{ color: 'black' }}>{comment.content}</span>
                            </Grid>
                            <Grid item style={{ marginLeft: 5, minWidth: 65 }} align="right">
                                <Space direction="vertical" size={0}>
                                    <Chip
                                        className={classes.backColor}
                                        size="small"
                                        icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                                        label={comment.likeCount}
                                    />
                                    <Grid className={classes.date}>
                                        <span className={classes.infoWrapper}>
                                            {commentTimeFormatter(comment.createdAt)}
                                        </span>
                                    </Grid>
                                </Space>
                            </Grid>
                        </Grid>
                    ))}
                    <Pagination
                        className={classes.paginationWrapper}
                        defaultCurrent={page || 1}
                        defaultPageSize={ITEMS_COUNT_PER_PAGE}
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
