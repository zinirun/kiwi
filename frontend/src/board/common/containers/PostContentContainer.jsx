import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Grid, Chip, Card, CardContent, Typography } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import 'antd/dist/antd.css';
import { useStyles } from '../styles/postContent.style';
import { GET_POST } from '../../../configs/queries';
import { message } from 'antd';
import moment from 'moment';
import PageTitle from '../../../common/components/PageTitle';

export default function PostContentContainer({ id }) {
    const classes = useStyles();
    const history = useHistory();
    const [post, setPost] = useState(null);
    const { data: postData, error: postError } = useQuery(GET_POST, {
        variables: {
            id,
        },
    });

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
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                            >
                                {post.title}
                            </Typography>
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
                                icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
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
