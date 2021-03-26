import React, { useState } from 'react';
import { Input, Row, Col, message, Button } from 'antd';
import { Grid } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { SEARCH_USER_BY_USER_ID, SEARCH_USER_BY_STUDENT_NUMBER } from '../../configs/queries';
import { useStyles } from '../styles/admin.style';
const { Search } = Input;

const buttonData = [
    {
        type: 0,
        buttonName: '일반회원',
    },
    {
        type: 1,
        buttonName: '학생회장',
    },
    {
        type: 2,
        buttonName: '부학생회장',
    },
    {
        type: 3,
        buttonName: '과사무실',
    },
    {
        type: 9,
        buttonName: '관리자',
    },
];

export default function UserContainer() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState(null);

    const [searchUserByUserId] = useMutation(SEARCH_USER_BY_USER_ID);
    const [searchUserByStudentNumber] = useMutation(SEARCH_USER_BY_STUDENT_NUMBER);

    const onSearchByUserId = (value) => {
        searchUserByUserId({
            variables: {
                id: value,
            },
        })
            .then((result) => {
                setUserInfo(result.data.searchUserByUserId);
            })
            .catch(() => {
                message.error('고유아이디에 맞는 회원이 없습니다. 다시 입력해주세요.');
            });
    };

    const onSearchByGradeNumber = (value) => {
        searchUserByStudentNumber({
            variables: {
                studentNumber: value,
            },
        })
            .then((result) => {
                setUserInfo(result.data.searchUserByStudentNumber);
            })
            .catch(() => {
                message.error('학번에 맞는 회원이 없습니다. 다시 입력해주세요.');
            });
    };
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Search
                        placeholder="아이디로 조회"
                        enterButton="조회"
                        size="middle"
                        className={classes.searchSection}
                        onSearch={onSearchByUserId}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Search
                        placeholder="학번으로 조회"
                        allowClear
                        enterButton="조회"
                        size="middle"
                        className={classes.searchSection}
                        onSearch={onSearchByGradeNumber}
                    />
                </Grid>
            </Grid>
            {userInfo && (
                <>
                    <Row gutter={[12, 12]} className={classes.infoSection}>
                        <Col span={4}>고유아이디</Col>
                        <Col span={18}>{userInfo.id}</Col>
                        <Col span={4}>계정</Col>
                        <Col span={18}>{userInfo.userAccount}</Col>
                        <Col span={4}>학과</Col>
                        <Col span={20}>{userInfo.department}</Col>
                        <Col span={4}>학번</Col>
                        <Col span={20}>{userInfo.studentNumber}</Col>
                        <Col span={4}>이름</Col>
                        <Col span={20}>{userInfo.userName}</Col>
                        <Col span={4}>이메일</Col>
                        <Col span={20}>{userInfo.email}</Col>
                        <Col span={4}>상태</Col>
                        <Col span={20}>
                            <UserStatus status={userInfo.status} />
                        </Col>
                        <Col span={4}>타입</Col>
                        <Col span={20}>
                            <UserType type={userInfo.type} />
                        </Col>
                    </Row>
                    <Grid container className={classes.buttonSection}>
                        <Grid item xs={12} sm={2}>
                            <Button type="primary" danger size="middle" className={classes.button}>
                                정지
                            </Button>
                        </Grid>
                        {buttonData.map((b, idx) => (
                            <Grid key={idx} item xs={12} sm={2}>
                                <Button
                                    type="primary"
                                    size="middle"
                                    value={b.type}
                                    className={classes.button}
                                >
                                    {b.buttonName}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </>
    );
}

function UserStatus({ status }) {
    switch (status) {
        case 0:
            return <span>미인증</span>;
        case 1:
            return <span>인증(활동 중)</span>;
        case 2:
            return <span>정지</span>;
        case 3:
            return <span>탈퇴</span>;
        default:
            return <span>-</span>;
    }
}

function UserType({ type }) {
    switch (type) {
        case 0:
            return <span>일반회원</span>;
        case 1:
            return <span>학생회장</span>;
        case 2:
            return <span>부학생회장</span>;
        case 3:
            return <span>과사무실</span>;
        case 9:
            return <span>관리자</span>;
        default:
            return <span>-</span>;
    }
}
