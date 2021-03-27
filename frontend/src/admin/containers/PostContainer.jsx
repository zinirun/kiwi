import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { Input, Row, Col, message, Button, Modal, Divider, Image } from 'antd';
import { useStyles } from '../styles/admin.style';
import { SEARCH_POST_BY_ADMIN } from '../../configs/queries';

const { Search } = Input;
const { confirm } = Modal;

export default function UserContainer() {
    const classes = useStyles();
    const [post, setPost] = useState(null);

    const [getPostByAdmin] = useMutation(SEARCH_POST_BY_ADMIN);

    const isImageFile = (mime) => {
        return mime.split('/')[0] === 'image';
    };

    const onSearchByAdmin = (value) => {
        getPostByAdmin({
            variables: {
                postId: value,
            },
        })
            .then((result) => {
                setPost(result.data.getPostByAdmin);
            })
            .catch(() => {
                message.error('게시글 검색 중 오류가 발생했습니다.');
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
                            //onClick={handleStatus}
                        >
                            삭제
                        </Button>
                    </div>
                    <Row gutter={[12, 12]} className={classes.infoSection}>
                        <Col span={4}>게시글 고유 ID</Col>
                        <Col span={18}>{post.id}</Col>
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
                </>
            )}
        </>
    );
}
