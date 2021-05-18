import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import { LogoIcon } from '../components/Logo';
import { Link } from 'react-router-dom';
import { message, Space, Spin } from 'antd';
import { useStyles } from '../static/signPages.style';
import axios from 'axios';
import { SignupValidator } from '../validators/signup.validator';

export default function SignUpPage(props) {
    const classes = useStyles();
    const [metadata, setMetadata] = useState({
        departments: [],
        studentGrades: [],
        companies: [],
    });
    const [user, setUser] = useState({
        userAccount: '',
        password: '',
        passwordAgain: '',
        userName: '',
        departmentId: '',
        studentNumber: '',
        studentGradeId: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get('/api/user/metadata/signup')
            .then(({ data }) => {
                const { companies, departments, studentGrades } = data;
                setMetadata({
                    departments,
                    studentGrades,
                    companies,
                });
            })
            .catch(() =>
                message.error(
                    '회원가입 메타 정보를 불러오는 중 에러가 발생했습니다. 새로고침 후 다시 시도하세요.',
                ),
            );
    }, []);

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUser({ ...user, [name]: value });
        },
        [user],
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const newUser = await SignupValidator(user);
            axios
                .post('/api/user/signup', {
                    user: { ...newUser, email: `${newUser.studentNumber}@dankook.ac.kr` },
                })
                .then(({ data }) => {
                    const { success } = data;
                    setLoading(false);
                    if (!success) {
                        const { message } = data;
                        switch (message) {
                            case 'EXITED':
                                return message.info('탈퇴한 회원입니다.');
                            case 'USER_ACCOUNT':
                                return message.error(
                                    '사용 중인 아이디입니다. 다른 아이디를 사용하세요.',
                                );
                            default:
                                return message.error('이미 가입된 학번입니다.');
                        }
                    }
                    message.success(
                        '회원가입이 완료되었습니다. 이메일 인증 후 서비스를 이용하세요.',
                    );
                    props.history.push('/signin');
                })
                .catch(() => {
                    message.error('회원가입 중 오류가 발생했습니다.');
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            message.error(error.message);
        }
    };

    return (
        <div className={classes.paper}>
            <Space>
                <LogoIcon />
                <span className={classes.loginTitle}>
                    Welcome to <span className={classes.loginTitleGreen}>Kiwi</span>
                </span>
            </Space>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container className={classes.loginFormContainer} spacing={2} justify="center">
                    <Grid item xs={12}>
                        <TextField
                            name="userAccount"
                            variant="outlined"
                            fullWidth
                            label="아이디"
                            onChange={handleChange}
                            value={user.userAccount}
                            autoFocus
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            name="password"
                            variant="outlined"
                            fullWidth
                            label="비밀번호"
                            onChange={handleChange}
                            value={user.password}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            name="passwordAgain"
                            variant="outlined"
                            fullWidth
                            label="비밀번호 확인"
                            onChange={handleChange}
                            value={user.passwordAgain}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="userName"
                            variant="outlined"
                            fullWidth
                            label="이름"
                            onChange={handleChange}
                            value={user.userName}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="studentNumber"
                            variant="outlined"
                            fullWidth
                            label="학번"
                            onChange={handleChange}
                            value={user.studentNumber}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            variant="outlined"
                            fullWidth
                            label="이메일 (자동 입력)"
                            value={`${user.studentNumber}@dankook.ac.kr`}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel>학과 선택</InputLabel>
                            <Select
                                name="departmentId"
                                label="학과 선택"
                                onChange={handleChange}
                                value={user.departmentId}
                                required
                            >
                                <MenuItem value="">
                                    <em>학과 선택</em>
                                </MenuItem>
                                {metadata.departments.map((d, idx) => (
                                    <MenuItem key={idx} value={d.id}>
                                        {d.deptName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel>학년 선택</InputLabel>
                            <Select
                                name="studentGradeId"
                                label="학년 선택"
                                onChange={handleChange}
                                value={user.studentGradeId}
                                required
                            >
                                <MenuItem value="">
                                    <em>학년 선택</em>
                                </MenuItem>
                                {metadata.studentGrades.map((d, idx) => (
                                    <MenuItem key={idx} value={d.id}>
                                        {d.gradeName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        {loading ? (
                            <Spin />
                        ) : (
                            <Button
                                fullWidth
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                                className={classes.loginBt}
                            >
                                회원가입
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to={'/needsign'}
                            fullWidth
                            color="primary"
                            variant="outlined"
                            size="large"
                        >
                            첫 화면으로 이동
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to={'/signin'}
                            fullWidth
                            color="primary"
                            variant="outlined"
                            size="large"
                        >
                            로그인 화면으로 이동
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
