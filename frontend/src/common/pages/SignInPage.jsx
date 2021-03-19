import React, { useCallback, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { LogoIcon } from '../components/Logo';
import { Link } from 'react-router-dom';
import { message, Space } from 'antd';
import { useStyles } from '../static/signPages.style';
import axios from 'axios';
import moment from 'moment';

export default function SignInPage(props) {
    const classes = useStyles();
    const idInput = useRef();
    const pwdInput = useRef();
    const [user, setUser] = useState({
        userAccount: '',
        password: '',
    });
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUser({ ...user, [name]: value });
        },
        [user],
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.userAccount) {
            message.error('아이디를 입력하세요');
            idInput.current.focus();
            return;
        } else if (!user.password) {
            message.error('비밀번호를 입력하세요');
            pwdInput.current.focus();
            return;
        }
        axios
            .post('/api/user/signin', {
                user,
            })
            .then(({ data }) => {
                const { success, message: signMessage, user } = data;
                console.log(data);
                if (success) {
                    window.location.href = '/';
                } else {
                    switch (signMessage) {
                        case 'NO_STUDENT_CARD':
                            // 학생증 인증 파트로 이동
                            return;
                        case 'BLOCKED':
                            message.error(
                                `${moment(user.updatedAt).format(
                                    'YYYY-MM-DD HH:mm',
                                )}부로 정지된 회원입니다.`,
                            );
                            break;
                        case 'SECESSION':
                            message.error(
                                `${moment(user.updatedAt).format(
                                    'YYYY-MM-DD HH:mm',
                                )}부로 탈퇴된 회원입니다.`,
                            );
                            break;
                        default:
                            return;
                    }
                }
            })
            .catch(() => {
                message.error('아이디 또는 비밀번호를 다시 확인하세요.');
            });
    };

    return (
        <div className={classes.paper}>
            <Space>
                <LogoIcon />
                <span className={classes.loginTitle}>
                    <span className={classes.loginTitleGreen}>Kiwi</span>ful Day
                </span>
            </Space>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container className={classes.loginFormContainer} spacing={2} justify="center">
                    <Grid item xs={12} align="center">
                        <TextField
                            name="userAccount"
                            variant="outlined"
                            fullWidth
                            label="아이디를 입력하세요."
                            onChange={handleChange}
                            value={user.userAccount}
                            inputRef={idInput}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            type="password"
                            name="password"
                            variant="outlined"
                            fullWidth
                            label="비밀번호를 입력하세요."
                            onChange={handleChange}
                            value={user.password}
                            inputRef={pwdInput}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            fullWidth
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="large"
                            className={classes.loginBt}
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to={'/signup'}
                            fullWidth
                            color="primary"
                            variant="outlined"
                            size="large"
                        >
                            회원가입
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to={'/finduser'}
                            fullWidth
                            color="primary"
                            variant="outlined"
                            size="large"
                        >
                            아이디/비밀번호 찾기
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
