import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Grid } from '@material-ui/core';
import { Form, Input, message, Space, Tooltip, Modal } from 'antd';
import { useEffect, useState } from 'react';
import {
    CREATE_GROUP_COMMENT,
    GET_GROUP_COMMENTS,
    DELETE_GROUP_COMMENT,
} from '../../configs/queries';
import { useStyles } from '../styles/groupComment.style';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { commentTimeFormatter } from '../../board/common/tools/formatter';
import { BoardListSkeleton } from '../../board/common/components/Skeletons';
import NoResult from '../../board/common/components/NoResult';

const { TextArea } = Input;
const { confirm } = Modal;

export default function GroupCommentContainer({ id }) {
    const classes = useStyles();
    const [form] = Form.useForm();
    const [createGroupComment] = useMutation(CREATE_GROUP_COMMENT);
    const [deleteGroupComment] = useMutation(DELETE_GROUP_COMMENT);
    const [comments, setComments] = useState(false);
    const {
        data: commentsData,
        loading: commentsLoading,
        error: commentsError,
        refetch: commentsRefetch,
    } = useQuery(GET_GROUP_COMMENTS, {
        variables: {
            groupId: id,
        },
    });
    useEffect(() => {
        if (commentsData) {
            const comments = commentsData.getGroupComments.map((c) => {
                return {
                    ...c,
                    createdAt: commentTimeFormatter(c.createdAt),
                };
            });
            setComments(comments);
        }
        if (commentsError) {
            message.error('그룹의 대화를 가져오는 중 문제가 발생했습니다.');
        }
    }, [commentsData, commentsError]);
    const handleCommentSubmit = ({ content }) => {
        if (!content.replaceAll(' ', '')) return;
        createGroupComment({
            variables: {
                comment: {
                    groupId: id,
                    content,
                },
            },
        })
            .then(() => {
                form.resetFields();
                commentsRefetch();
            })
            .catch(() => {
                message.error('대화를 보내는 중 문제가 발생했습니다.');
            });
    };
    const triggerDeleteGroupComment = (id) => {
        deleteGroupComment({
            variables: {
                id,
            },
        })
            .then(() => {
                message.success('대화가 삭제되었습니다.');
                commentsRefetch();
            })
            .catch(() => {
                message.error('대화를 삭제하는 중 문제가 발생했습니다.');
            });
    };
    const handleDelete = (id) => {
        confirm({
            title: '이 대화를 삭제할까요?',
            content: '삭제된 후에는 복구할 수 없습니다.',
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                triggerDeleteGroupComment(id);
            },
        });
    };
    return (
        <>
            {commentsLoading && <BoardListSkeleton />}
            {!commentsLoading && comments.length === 0 && <NoResult title="대화 내용" />}
            {!commentsLoading &&
                comments.length > 0 &&
                comments.map((item) => (
                    <Grid
                        key={item.id}
                        container
                        className={classes.commentField}
                        style={{
                            backgroundColor: item.authorId === item.userId && '#f1fff4',
                        }}
                    >
                        <Grid container className={classes.flexWrapper}>
                            <Grid item style={{ flex: 1 }}>
                                <span className={classes.authorInfo}>{item.authorGradeName}</span>
                                <span className={classes.author}>{item.authorName}</span>
                                <span className={classes.date}>{item.createdAt}</span>
                            </Grid>
                            <Grid item>
                                <Space size={2}>
                                    {item.authorId === item.userId && (
                                        <Tooltip title="대화 삭제">
                                            <DeleteOutlinedIcon
                                                post={item.postId}
                                                onClick={() => handleDelete(item.id)}
                                                className={classes.deleteIcon}
                                            />
                                        </Tooltip>
                                    )}
                                </Space>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {item.content.split('\n').map((text, idx) => (
                                <p key={idx} className={classes.commentLine}>
                                    {text}
                                </p>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            <Form form={form} onFinish={handleCommentSubmit} className={classes.commentForm}>
                <Form.Item name="content" className={classes.commentTextareaSection}>
                    <TextArea name="content" rows={3} allowClear maxLength={500} autoFocus />
                </Form.Item>
                <Form.Item>
                    <div className={classes.addCommentSection}>
                        <Space size={0}>
                            <Button type="submit" className={classes.button}>
                                보내기
                            </Button>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
}
