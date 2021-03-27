import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from '../static/signPages.style';
import axios from 'axios';
import { Form, Input, message } from 'antd';

export default function FindUserPage() {
    const classes = useStyles();
    const [toFind, setToFind] = useState(null);

    const handleSetToFind = (toFind) => {
        setToFind(toFind);
    };

    return (
        <div className={classes.paper}>
            <span className={classes.loginTitle}>
                <span className={classes.loginTitleGreen}>계정 찾기</span>
            </span>
            <Grid container className={classes.loginFormContainer} spacing={2} justify="center">
                <Grid item xs={12} sm={6} align="center">
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        size="large"
                        className={classes.loginBt}
                        onClick={() => handleSetToFind('userAccount')}
                    >
                        아이디 찾기
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} align="center">
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        size="large"
                        className={classes.loginBt}
                        onClick={() => handleSetToFind('password')}
                    >
                        비밀번호 초기화
                    </Button>
                </Grid>
                {toFind === 'userAccount' && <FindUserAccountGrid />}
                {toFind === 'password' && <FindPasswordGrid />}
                <Grid item xs={12}>
                    <Button
                        component={Link}
                        to={'/signin'}
                        fullWidth
                        color="primary"
                        variant="outlined"
                        size="large"
                    >
                        로그인 페이지로 이동
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

function FindPasswordGrid() {
    const classes = useStyles();
    const [found, setFound] = useState(null);
    const handleSubmit = ({ userName, userAccount, studentNumber }) => {
        axios
            .post('/api/user/reset_password', {
                user: { userName, userAccount, studentNumber },
            })
            .then(({ data }) => {
                const { email, userName } = data;
                setFound({
                    email,
                    userName,
                });
            })
            .catch(() => {
                message.error('입력한 정보와 일치하는 회원이 없습니다.');
            });
    };
    return (
        <Grid item xs={12} style={{ marginTop: 10 }}>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="userName"
                    rules={[{ required: true, message: '이름을 입력하세요.' }]}
                >
                    <Input name="userName" placeholder="이름을 입력하세요" size="large" />
                </Form.Item>
                <Form.Item
                    name="userAccount"
                    rules={[{ required: true, message: '아이디를 입력하세요.' }]}
                >
                    <Input name="userAccount" placeholder="아이디를 입력하세요" size="large" />
                </Form.Item>
                <Form.Item
                    name="studentNumber"
                    rules={[{ required: true, message: '학번을 입력하세요.' }]}
                >
                    <Input name="studentNumber" placeholder="학번을 입력하세요" size="large" />
                </Form.Item>
                {found ? (
                    <div className={classes.foundWrapper}>
                        <span className={classes.foundText}>{found.userName}</span>님의 이메일{' '}
                        <span className={classes.foundText}>{found.email}</span>로 초기화된
                        비밀빈호를 전송했습니다.
                    </div>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large"
                        className={classes.loginBt}
                    >
                        비밀번호 초기화
                    </Button>
                )}
            </Form>
        </Grid>
    );
}

function FindUserAccountGrid() {
    const classes = useStyles();
    const [found, setFound] = useState(null);
    const handleSubmit = ({ userName, studentNumber }) => {
        axios
            .post('/api/user/find_user_account', {
                user: {
                    userName,
                    studentNumber,
                },
            })
            .then(({ data }) => {
                const { userAccount, userName } = data;
                setFound({
                    userAccount,
                    userName,
                });
            })
            .catch(() => {
                message.error('입력한 정보와 일치하는 회원이 없습니다.');
            });
    };
    return (
        <Grid item xs={12} style={{ marginTop: 10 }}>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="userName"
                    rules={[{ required: true, message: '이름을 입력하세요.' }]}
                >
                    <Input name="userName" placeholder="이름을 입력하세요" size="large" />
                </Form.Item>
                <Form.Item
                    name="studentNumber"
                    rules={[{ required: true, message: '학번을 입력하세요.' }]}
                >
                    <Input name="studentNumber" placeholder="학번을 입력하세요" size="large" />
                </Form.Item>
                {found ? (
                    <div className={classes.foundWrapper}>
                        <span className={classes.foundText}>{found.userName}</span>님의 아이디는{' '}
                        <span className={classes.foundText}>{found.userAccount}</span>입니다.
                    </div>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large"
                        className={classes.loginBt}
                    >
                        아이디 찾기
                    </Button>
                )}
            </Form>
        </Grid>
    );
}
