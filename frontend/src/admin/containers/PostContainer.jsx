import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { Input, Row, Col, message, Button, Modal, Divider, Image, Collapse } from 'antd';
import { useStyles } from '../styles/admin.style';
import { SEARCH_POST_BY_ADMIN, DELETE_POST } from '../../configs/queries';
import moment from 'moment';
const { Search } = Input;
const { confirm } = Modal;
const { Panel } = Collapse;

export default function UserContainer() {
    const classes = useStyles();
    const [post, setPost] = useState(null);

    const [getPostByAdmin] = useMutation(SEARCH_POST_BY_ADMIN);
    const [deletePost] = useMutation(DELETE_POST);

    const isImageFile = (mime) => {
        return mime.split('/')[0] === 'image';
    };

    const triggerDeletePost = () => {
        deletePost({
            variables: {
                id: post.id,
            },
        })
            .then((result) => {
                if (result.data) {
                    message.success(
                        '게시글이 삭제되었습니다. 다시 조회하시면 변경 사항 확인이 가능합니다.',
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
            content: '삭제된 게시글은 복구할 수 없습니다.',
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                triggerDeletePost();
            },
        });
    };

    return (
        <>
            <Search
                placeholder="게시글 고유 ID로 조회"
                enterButton="조회"
                size="middle"
                className={classes.searchSection}
                onSearch={onSearchByAdmin}
            />
            {post && (
                <>
                    <div>
                        <Button
                            type="primary"
                            danger
                            size="middle"
                            value="2"
                            className={classes.buttonSection}
                            onClick={handlePostDelete}
                        >
                            삭제
                        </Button>
                    </div>
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
                        <Col span={4}>이름 / 아이디</Col>
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
                        <Panel header="게시글 관련 댓글 보기" key="1"></Panel>
                    </Collapse>
                </>
            )}
        </>
    );
}
