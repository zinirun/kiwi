import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import QueryString from 'query-string';
import { Button } from '@material-ui/core';
import { Form, Input, message, Modal } from 'antd';
import PageTitle from '../../../common/components/PageTitle';
import { useStyles } from '../styles/postWrite.style';
import { boardCommonStyles } from '../styles/board.common.style';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_POST, GET_POST } from '../../../configs/queries';
import { FileAddOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { TextArea } = Input;

export default function PostModifyPage() {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const { search } = useLocation();
    const history = useHistory();
    const { postId } = QueryString.parse(search);
    const [post, setPost] = useState(null);
    const { data: postData, error: postError } = useQuery(GET_POST, {
        variables: {
            id: postId,
        },
    });
    const [updatePost] = useMutation(UPDATE_POST);

    useEffect(() => {
        if (postData) {
            const { id, title, content, boardName, authorId, userId } = postData.getPostById;
            if (userId !== authorId) {
                message.error('게시자만 수정할 수 있습니다.');
                history.goBack();
            }
            setPost({
                id,
                title,
                content,
                boardName,
            });
        }
        if (postError) {
            message.error('게시글을 불러오는 중 오류가 발생했습니다.');
            history.goBack();
        }
    }, [postData, postError, history]);

    const triggerUpdatePost = (updatedPost) => {
        updatePost({
            variables: {
                id: post.id,
                post: updatedPost,
            },
        })
            .then(() => {
                message.success('게시글이 수정되었습니다.');
                history.push(`/post/${post.id}`);
            })
            .catch(() => {
                message.error('게시글 수정 중 오류가 발생했습니다.');
            });
    };

    const handleFinish = (updatedPost) => {
        confirm({
            title: '게시글을 수정할까요?',
            icon: <FileAddOutlined style={{ color: 'dodgerblue' }} />,
            content: '악의적 성향의 글은 회원 정지의 원인이 될 수 있습니다.',
            okText: '게시글 수정',
            cancelText: '취소',
            onOk() {
                triggerUpdatePost(updatedPost);
            },
        });
    };

    return (
        <Form onFinish={handleFinish}>
            {post && (
                <>
                    <PageTitle title={`게시글 수정 - ${post.boardName}`} />
                    <Form.Item
                        name="title"
                        initialValue={post.title}
                        rules={[{ required: true, message: '제목을 입력하세요.' }]}
                    >
                        <Input
                            name="title"
                            size="large"
                            placeholder="제목을 입력하세요"
                            autoFocus
                            maxLength={25}
                        />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        initialValue={post.content}
                        rules={[{ required: true, message: '내용을 입력하세요.' }]}
                    >
                        <TextArea
                            name="content"
                            placeholder="내용을 입력하세요"
                            className={classes.textarea}
                            rows={13}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className={classes.flexReverse}>
                            <Button type="submit" className={classes.button} size="small">
                                글 수정
                            </Button>
                        </div>
                    </Form.Item>
                </>
            )}
        </Form>
    );
}
