import React, { useState } from 'react';
import { Input, Row, Col, message, Button, Modal } from 'antd';
import { Grid } from '@material-ui/core';
import { useStyles } from '../styles/admin.style';
const { Search } = Input;
const { confirm } = Modal;

export default function UserContainer() {
    const classes = useStyles();
    const [post, setPost] = useState(null);

    const onSearchByPostId;

    return (
        <>
            <Search
                placeholder="게시글 아이디로 조회"
                enterButton="조회"
                size="middle"
                className={classes.searchSection}
                onSearch={onSearchByPostId}
            />
            {post && (
                <>
                    <Row gutter={[12, 12]} className={classes.infoSection}>
                        <Col span={4}>게시글 아이디</Col>
                        <Col span={18}>{post.id}</Col>
                        <Col span={4}>게시글 제목</Col>
                        <Col span={18}>{post.title}</Col>
                        <Col span={4}>학과</Col>
                        <Col span={20}>{post.department}</Col>
                        <Col span={4}>학번</Col>
                        <Col span={20}>{post.studentNumber}</Col>
                        <Col span={4}>이름</Col>
                        <Col span={20}>{post.userName}</Col>
                        <Col span={4}>작성자 고유아이디</Col>
                        <Col span={20}>{post.authorId}</Col>
                        <Col span={4}>상태</Col>
                        <Col span={20}>{post.isDeleted === 0 ? '게시 중' : '삭제 게시글'}</Col>
                    </Row>
                    <Button
                        type="primary"
                        danger
                        size="middle"
                        value="2"
                        className={classes.button}
                        //onClick={handleStatus}
                    >
                        정지
                    </Button>
                </>
            )}
        </>
    );
}
