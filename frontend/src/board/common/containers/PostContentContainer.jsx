import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useHistory } from 'react-router';
import { Grid, Chip, Card, CardContent } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { useStyles } from '../styles/postContent.style';
import { GET_POST, HANDLE_POST_LIKE, DELETE_POST, SCRAP_POST } from '../../../configs/queries';
import { message, Modal, Tooltip, Space, Image, Divider } from 'antd';
import moment from 'moment';
import PageTitle from '../../../common/components/PageTitle';
import { PostContentSkeleton } from '../components/Skeletons';
import CommentContainer from '../containers/CommentContainer';

const { confirm } = Modal;

export default function PostContentContainer({ id }) {
    const classes = useStyles();
    const history = useHistory();
    const [post, setPost] = useState(null);
    const {
        data: postData,
        error: postError,
        refetch: postRefetch,
        loading: postLoading,
    } = useQuery(GET_POST, {
        variables: {
            id,
        },
    });

    const [handlePostLike] = useMutation(HANDLE_POST_LIKE);
    const [deletePost] = useMutation(DELETE_POST);
    const [scrapPost] = useMutation(SCRAP_POST);

    useEffect(() => {
        postRefetch().catch(() => {});
    }, [postRefetch]);

    useEffect(() => {
        if (postData) {
            const post = postData.getPostById;
            setPost({
                ...post,
                createdAt: new moment(post.createdAt).format('YYYY-MM-DD HH:mm'),
            });
        }
        if (postError) {
            message.error('존재하지 않는 게시글입니다.');
            history.push('/');
        }
    }, [postData, postError, history]);

    const triggerDeletePost = () => {
        deletePost({
            variables: {
                id: post.id,
            },
        })
            .then(() => {
                message.success('게시글이 삭제되었습니다.');
                history.push(`/board/${post.boardLink}`);
            })
            .catch(() => {
                message.error('게시글 삭제 중 오류가 발생했습니다.');
            });
    };

    const handleScrap = () => {
        scrapPost({
            variables: {
                postId: post.id,
            },
        })
            .then(({ data }) => {
                const { scrapPost: result } = data;
                if (result === 'Add') {
                    message.success('스크랩 되었습니다.');
                } else {
                    message.success('스크랩이 취소되었습니다.');
                }
            })
            .catch(() => message.error('스크랩 중 문제가 발생했습니다.'));
    };

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
            title: '게시글을 삭제할까요?',
            content: '삭제된 게시글은 복구할 수 없습니다.',
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                triggerDeletePost();
            },
        });
    };

    const handleModify = () => {
        history.push(`/modify?postId=${post.id}`);
    };

    const isImageFile = (mime) => {
        return mime.split('/')[0] === 'image';
    };

    console.log(post);

    return (
        <>
            {postLoading && <PostContentSkeleton />}
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

                                <Grid item xs={12} sm={6} align="right">
                                    {post.userId === post.authorId && (
                                        <Space size="small">
                                            <Tooltip title="게시글 수정">
                                                <CreateOutlinedIcon
                                                    className={classes.modifyIcon}
                                                    onClick={handleModify}
                                                />
                                            </Tooltip>
                                            <Tooltip title="게시글 삭제">
                                                <DeleteOutlinedIcon
                                                    onClick={handleDelete}
                                                    className={classes.deleteIcon}
                                                />
                                            </Tooltip>
                                        </Space>
                                    )}
                                    {post.userId !== post.authorId && (
                                        <Tooltip title="스크랩">
                                            <StarOutlineIcon
                                                className={classes.scrapIcon}
                                                onClick={handleScrap}
                                            />
                                        </Tooltip>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container justify="center" className={classes.userInfoSection}>
                                <Grid item xs={12} sm={6}>
                                    <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                        {post.createdAt}
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={6} align="right">
                                    <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                        {post.gradeName}
                                    </span>
                                    <span> {post.authorName}</span>
                                </Grid>
                            </Grid>
                            {post.content.split('\n').map((text, idx) => (
                                <p key={idx} className={classes.contentLine}>
                                    {text}
                                </p>
                            ))}
                            {post.files && (
                                <div className={classes.attachWrapper}>
                                    <Divider />
                                    {post.files.map((file) =>
                                        isImageFile(file.fileType) ? (
                                            <div key={file.id} className={classes.imageWrapper}>
                                                <Image
                                                    className={classes.image}
                                                    src={file.fileUrl}
                                                    alt={file.fileName}
                                                />
                                            </div>
                                        ) : (
                                            <p key={file.id} className={classes.normalFileWrapper}>
                                                <a href={file.fileUrl} download={file.fileName}>
                                                    {file.fileName}
                                                </a>
                                            </p>
                                        ),
                                    )}
                                </div>
                            )}
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
            <CommentContainer id={id} postRefetch={postRefetch} />
        </>
    );
}
