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
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useStyles } from '../static/signPages.style';
import axios from 'axios';
import { SignupValidator } from '../validators/signup.validator';
import PageTitle from '../components/PageTitle';

export default function ChangeUserInfoPage(props) {
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
        companyId: '',
    });

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

        try {
            const newUser = await SignupValidator(user);
            axios
                .post('/api/user/signup', {
                    user: newUser,
                })
                .then(() => {
                    message.success('회원가입이 완료되었습니다.');
                    props.history.push('/signin');
                })
                .catch(() => {
                    message.error('회원가입 중 오류가 발생했습니다.');
                });
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <>
            <PageTitle title="회원정보 수정" />
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12} align="center">
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
                    <Grid item xs={12} align="center">
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
                    <Grid item xs={12} align="center">
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
                    <Grid item xs={12} align="center">
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
                    <Grid item xs={12} align="center">
                        <TextField
                            name="studentNumber"
                            variant="outlined"
                            fullWidth
                            label="학번"
                            onChange={handleChange}
                            value={user.studentNumber}
                            autoFocus
                            required
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
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>재직중인 회사 선택</InputLabel>
                            <Select
                                name="companyId"
                                label="재직중인 회사 선택"
                                onChange={handleChange}
                                value={user.companyId}
                            >
                                <MenuItem value="">
                                    <em>회사 선택</em>
                                </MenuItem>
                                {metadata.companies.map((d, idx) => (
                                    <MenuItem key={idx} value={d.id}>
                                        {d.companyName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                            회원정보 수정
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
