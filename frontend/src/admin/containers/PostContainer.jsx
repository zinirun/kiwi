import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { Input, Row, Col, message, Button, Modal, Divider, Image, Collapse, Space } from 'antd';
import { useStyles } from '../styles/admin.style';
import {
    SEARCH_POST_BY_ADMIN,
    DELETE_POST_BY_ADMIN,
    DELETE_COMMENT_BY_ADMIN,
} from '../../configs/queries';
import moment from 'moment';
const { Search } = Input;
const { confirm } = Modal;
const { Panel } = Collapse;

export default function UserContainer() {
    const classes = useStyles();
    const [post, setPost] = useState(null);
    const [postReason, setPostReason] = useState(null);

    const [getPostByAdmin] = useMutation(SEARCH_POST_BY_ADMIN);
    const [deletePostByAdmin] = useMutation(DELETE_POST_BY_ADMIN);

    const isImageFile = (mime) => {
        return mime.split('/')[0] === 'image';
    };

    const triggerDeletePost = () => {
        deletePostByAdmin({
            variables: {
                id: post.id,
                reason: postReason,
            },
        })
            .then((result) => {
                if (result.data) {
                    message.success(
                        '게시글이 삭제되었습니다. 변경 사항을 확인하려면 다시 조회하세요.',
                    );
                }
            })
            .catch(() => {
                message.error('게시글 삭제 중 오류가 발생했습니다.');
            });
    };

    const onSearchByAdmin = (value) => {
        getPostByAdmin({
            variables: {
                postId: value,
            },
        })
            .then((result) => {
                const post = result.data.getPostByAdmin;
                setPost({
                    ...post,
                    createdAt: new moment(post.createdAt).format('YYYY-MM-DD HH:mm'),
                });
            })
            .catch(() => {
                message.error('게시글 검색 중 오류가 발생했습니다.');
            });
    };

    const handlePostDelete = () => {
        confirm({
            title: '게시글을 삭제할까요?',
            content: '삭제된 게시글은 복구할 수 없습니다. 게시글의 하위 댓글도 모두 삭제됩니다.',
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                triggerDeletePost();
            },
        });
    };

    return (
        <>
            <div>
                <Search
                    placeholder="게시글 고유 ID로 조회"
                    enterButton="조회"
                    size="middle"
                    className={classes.searchSection}
                    onSearch={onSearchByAdmin}
                />
            </div>
            {post && (
                <>
                    <Space size={0} className={classes.reasonWrapper}>
                        <Input
                            placeholder="게시글 삭제 사유를 입력하세요."
                            className={classes.reasonInput}
                            value={postReason}
                            onChange={(e) => setPostReason(e.target.value)}
                        />
                        <Button
                            disabled={post.isDeleted === 0 && postReason ? false : true}
                            type="primary"
                            danger
                            onClick={handlePostDelete}
                        >
                            삭제
                        </Button>
                    </Space>
                    <Row gutter={[12, 12]} className={classes.infoSection}>
                        <Col span={4}>게시글 고유 ID</Col>
                        <Col span={18}>{post.id}</Col>
                        <Col span={4}>게시글 생성일</Col>
                        <Col span={18}>{post.createdAt}</Col>
                        <Col span={4}>게시글 제목</Col>
                        <Col span={18}>{post.title}</Col>
                        <Col span={4}>학과</Col>
                        <Col span={20}>{post.department}</Col>
                        <Col span={4}>학년</Col>
                        <Col span={20}>{post.gradeName}</Col>
                        <Col span={4}>이름 / 회원ID</Col>
                        <Col span={20}>
                            {post.authorName} / {post.authorId}{' '}
                        </Col>
                        <Col span={4}>상태</Col>
                        <Col span={20}>{post.isDeleted === 0 ? '게시 중' : '삭제 게시글'}</Col>
                    </Row>
                    {
                        <div className={classes.attachWrapper}>
                            <Divider />
                            {post.files &&
                                post.files.map((file) =>
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
                    }
                    <Collapse>
                        <Panel header="게시글 관련 댓글 보기" key="1">
                            {post.comments &&
                                post.comments.map((comment) => (
                                    <CommentContainer
                                        key={comment.id}
                                        comment={comment}
                                        postId={post.id}
                                    />
                                ))}
                        </Panel>
                    </Collapse>
                </>
            )}
        </>
    );
}

function CommentContainer({ comment, postId }) {
    const classes = useStyles();

    const [commentReason, setCommentReason] = useState(null);

    const [deleteCommentByAdmin] = useMutation(DELETE_COMMENT_BY_ADMIN);

    const triggerDeleteComment = (commentId) => {
        deleteCommentByAdmin({
            variables: {
                id: commentId,
                postId,
                reason: commentReason,
            },
        })
            .then((result) => {
                if (result.data) {
                    message.success(
                        '댓글이 삭제되었습니다. 변경 사항을 확인하려면 다시 조회하세요.',
                    );
                }
            })
            .catch(() => {
                message.error('댓글 삭제 중 오류가 발생했습니다.');
            });
    };

    const handleCommentDelete = (e) => {
        const commentId = e.currentTarget.value;
        confirm({
            title: '댓글을 삭제할까요?',
            content: '삭제된 댓글은 복구할 수 없습니다.',
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                triggerDeleteComment(commentId);
            },
        });
    };
    return (
        <div className={classes.commentWrapper}>
            <Row gutter={[12, 12]}>
                <Col span={5}>댓글 고유 ID</Col>
                <Col span={19}>{comment.id}</Col>
                <Col span={5}>댓글 작성자 / 회원ID</Col>
                <Col span={19}>
                    {comment.authorName} / {comment.authorId}
                </Col>
                <Col span={5}>댓글 내용</Col>
                <Col span={19}>{comment.content}</Col>
                <Col span={5}>상태</Col>
                <Col span={19}>{comment.isDeleted === 0 ? '게시 중' : '삭제 댓글'}</Col>
            </Row>
            <div>
                {comment.isDeleted === 0 && (
                    <Space size={0} className={classes.reasonWrapper}>
                        <Input
                            placeholder="댓글 삭제 사유를 입력하세요."
                            value={commentReason}
                            className={classes.reasonInput}
                            onChange={(e) => setCommentReason(e.target.value)}
                        />
                        <Button
                            disabled={commentReason ? false : true}
                            type="primary"
                            danger
                            value={comment.id}
                            onClick={handleCommentDelete}
                        >
                            삭제
                        </Button>
                    </Space>
                )}
            </div>
        </div>
    );
}
