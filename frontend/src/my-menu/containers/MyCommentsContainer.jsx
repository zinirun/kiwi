import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { useStyles } from '../../board/common/styles/board.style';
import { boardCommonStyles } from '../../board/common/styles/board.common.style';
import moment from 'moment';
import { message } from 'antd';
import { GET_MY_COMMENTS } from '../../configs/queries';
import NoResult from '../../board/common/components/NoResult';

export default function MyCommentsContainer() {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const { data: commentsData, error: commentsError, loading: commentsLoading } = useQuery(
        GET_MY_COMMENTS,
    );

    useEffect(() => {
        if (commentsData) {
            setComments(
                commentsData.getMyComments.map((p) => {
                    return {
                        ...p,
                        createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (commentsError) {
            message.error('댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [commentsData, setComments, commentsError, history]);

    return (
        <>
            {!commentsLoading && comments.length === 0 && <NoResult title="내가 쓴 댓글" />}
            {comments.map((comment, idx) => (
                <Grid
                    container
                    justify="center"
                    spacing={0}
                    alignItems="center"
                    className={classes.content}
                    key={idx}
                >
                    <Grid
                        item
                        xs={12}
                        sm={10}
                        className={classes.title}
                        component={Link}
                        to={`/post/${comment.postId}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <span style={{ color: 'black' }}>{comment.content}</span>
                    </Grid>
                    <Grid item xs={12} sm={2} align="right">
                        <Chip
                            className={classes.backColor}
                            size="small"
                            icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                            label={comment.likeCount}
                        />
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
