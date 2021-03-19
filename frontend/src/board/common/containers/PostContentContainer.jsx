import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useHistory } from 'react-router';
import { Grid, Chip, Card, CardContent, Typography } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import 'antd/dist/antd.css';
import { useStyles } from '../styles/postContent.style';
import { GET_POST, HANDLE_POST_LIKE } from '../../../configs/queries';
import { message, Modal, Tooltip } from 'antd';
import moment from 'moment';
import PageTitle from '../../../common/components/PageTitle';

const { confirm } = Modal;

export default function PostContentContainer({ id }) {
    const classes = useStyles();
    const history = useHistory();
    const [post, setPost] = useState(null);
    const { data: postData, error: postError, refetch: postRefetch } = useQuery(GET_POST, {
        variables: {
            id,
        },
    });

    const [handlePostLike] = useMutation(HANDLE_POST_LIKE);

    useEffect(() => {
        if (postData) {
            const post = postData.getPostById;
            setPost({
                ...post,
                createdAt: new moment(post.createdAt).format('YYYY-MM-DD HH:mm'),
            });
        }
        if (postError) {
            message.error('게시글을 불러오는 중 오류가 발생했습니다.');
            history.push('/');
        }
    }, [postData, postError, history]);

    const handleLike = () => {
        handlePostLike({
            variables: {
                postId: post.id,
            },
        })
            .then(({ data }) => {
                const { handlePostLike: result } = data;
                if (result === 'Up') {
                    message.success('좋아요!');
                } else {
                    message.success('좋아요가 취소되었습니다.');
                }
                postRefetch();
            })
            .catch(() => message.error('게시글 좋아요 중 문제가 발생했습니다.'));
    };

    const handleDelete = () => {
        confirm({
            title: '게시물을 삭제할까요?',
            content: '삭제된 게시글은 복구할 수 없습니다.',
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                console.log('abc');
            },
        });
    };

    return (
        <>
            {post && (
                <>
                    <PageTitle title={post.boardName} />
                    <Card className={classes.root}>
                        <CardContent>
                            {post.categoryName && (
                                <span className={classes.part}>{post.categoryName}</span>
                            )}
                            <Grid container justify="center" className={classes.title}>
                                <Grid item xs={12} sm={6}>
                                    {post.title}
                                </Grid>
                                {post.userId === post.authorId && (
                                    <Grid item xs={12} sm={6} align="right">
                                        <Tooltip title="게시글 삭제">
                                            <DeleteOutlinedIcon
                                                onClick={handleDelete}
                                                className={classes.deleteIcon}
                                            />
                                        </Tooltip>
                                    </Grid>
                                )}
                            </Grid>
                            <Grid container justify="center" className={classes.userInfoSection}>
                                <Grid item xs={12} sm={6}>
                                    <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                        {post.createdAt}
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={6} align="right">
                                    {post.companyName && (
                                        <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                            {post.companyName}/
                                        </span>
                                    )}
                                    <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                        {post.gradeName}
                                    </span>
                                    <span> {post.authorName}</span>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" component="p">
                                {post.content}
                            </Typography>
                        </CardContent>
                        <Grid align="right">
                            <Chip
                                className={classes.postChip}
                                size="small"
                                icon={
                                    <ThumbUpOutlinedIcon
                                        value={post.id}
                                        onClick={handleLike}
                                        className={classes.upIcon}
                                    />
                                }
                                label={post.likeCount}
                            />
                            <Chip
                                className={classes.postChip}
                                size="small"
                                icon={
                                    <ChatBubbleOutlineOutlinedIcon
                                        className={classes.commentIcon}
                                    />
                                }
                                label={post.commentCount}
                            />
                        </Grid>
                    </Card>
                </>
            )}
        </>
    );
}
