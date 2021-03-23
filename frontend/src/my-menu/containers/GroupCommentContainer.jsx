import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import { Form, Input, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import { CREATE_COMMENT, GET_GROUP_COMMENTS } from '../../configs/queries';
import { useStyles } from '../styles/groupComment.style';

const { TextArea } = Input;

export default function GroupCommentContainer({ id }) {
    const classes = useStyles();
    const [form] = Form.useForm();
    const [createComment] = useMutation(CREATE_COMMENT);
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
            const comments = commentsData.getGroupComments;
            setComments(comments);
        }
        if (commentsError) {
            message.error('그룹의 대화를 가져오는 중 문제가 발생했습니다.');
        }
    }, [commentsData, commentsError]);
    const handleCommentSubmit = ({ content }) => {
        createComment({
            variables: {
                comment: {
                    groupId: id,
                    content,
                },
            },
        }).then(() => {});
    };
    return (
        <>
            <Form form={form} onFinish={handleCommentSubmit} className={classes.commentForm}>
                <Form.Item name="content" className={classes.commentTextareaSection}>
                    <TextArea name="content" rows={3} allowClear maxLength={500} />
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
