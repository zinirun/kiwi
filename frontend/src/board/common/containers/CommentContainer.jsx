import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Chip, Button } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Comment, List, Row, Col, message, Form, Input, Space } from 'antd';
import { useStyles } from '../styles/comment.style';
import { boardCommonStyles } from '../styles/board.common.style';
import { CREATE_COMMENT, GET_COMMENTS, HANDLE_COMMENT_LIKE } from '../../../configs/queries';
import { commentTimeFormatter } from '../tools/formatter';
const { TextArea } = Input;

export default function CommentList({ id }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [form] = Form.useForm();
    const [comments, setComments] = useState([]);
    const {
        data: commentsData,
        error: commentsError,
        loading: commentsLoading,
        refetch: commentsRefetch,
    } = useQuery(GET_COMMENTS, {
        variables: {
            id,
        },
    });
    const [createComment] = useMutation(CREATE_COMMENT);
    const [handleCommentLike] = useMutation(HANDLE_COMMENT_LIKE);

    useEffect(() => {
        if (commentsData) {
            setComments(
                commentsData.getCommentsByPostId.map((c) => {
                    return {
                        ...c,
                        createdAt: commentTimeFormatter(c.createdAt),
                    };
                }),
            );
        }
        if (commentsError) {
            message.error('게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [commentsData, setComments, commentsError, history]);

    const handleCommentSubmit = ({ content }) => {
        if (!content) return;
        createComment({
            variables: {
                comment: {
                    postId: id,
                    content,
                },
            },
        })
            .then(() => {
                form.resetFields();
                commentsRefetch();
            })
            .catch(() => message.error('댓글 등록 중 오류가 발생했습니다.'));
    };

    const handleLike = (e) => {
        e.preventDefault();
        handleCommentLike({
            variables: {
                commentId: e.currentTarget.getAttribute('value'),
            },
        })
            .then(({ data }) => {
                const { handleCommentLike: result } = data;
                if (result === 'Up') {
                    message.success('좋아요!');
                } else {
                    message.success('좋아요가 취소되었습니다.');
                }
                commentsRefetch();
            })
            .catch(() => message.error('댓글 좋아요 중 문제가 발생했습니다.'));
    };

    return (
        <>
            {!commentsLoading && (
                <>
                    <div className={classes.comment}>
                        <span>댓글</span>
                    </div>
                    {comments.length > 0 && (
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={comments}
                            renderItem={(item) => (
                                <li className={classes.commentField}>
                                    <Row justify="center" align="center">
                                        <Col span={21}>
                                            <Comment
                                                author={item.authorName}
                                                content={item.content}
                                                datetime={item.createdAt}
                                            />
                                        </Col>
                                        <Col span={3} align="center">
                                            <Chip
                                                className={classes.commentChip}
                                                size="small"
                                                icon={
                                                    <ThumbUpOutlinedIcon
                                                        value={item.id}
                                                        onClick={handleLike}
                                                        className={classes.upIcon}
                                                    />
                                                }
                                                label={item.likeCount}
                                            />
                                        </Col>
                                    </Row>
                                </li>
                            )}
                        />
                    )}
                    <Form
                        form={form}
                        onFinish={handleCommentSubmit}
                        className={classes.commentForm}
                    >
                        <Form.Item name="content" className={classes.commentTextareaSection}>
                            <TextArea name="content" rows={3} allowClear maxLength={99} />
                        </Form.Item>
                        <Form.Item>
                            <div className={classes.addCommentSection}>
                                <Space size={0}>
                                    <Button type="submit" className={classes.button}>
                                        댓글달기
                                    </Button>
                                </Space>
                            </div>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
    );
}
