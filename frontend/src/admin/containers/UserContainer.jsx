import React, { useState } from 'react';
import { Input, Row, Col, message } from 'antd';
import { Grid } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { SEARCH_USER_BY_USER_ID } from '../../configs/queries';
import { useStyles } from '../styles/user.style';
const { Search } = Input;

export default function UserContainer() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState(null);

    const [searchUserByUserId] = useMutation(SEARCH_USER_BY_USER_ID);

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
                message.error('회원 조회 중 오류가 발생했습니다.');
            });
    };

    const onSearchByGradeNumber = (value) => {
        console.log(value);
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
                <Row gutter={[12, 12]} className={classes.infoSection}>
                    <Col span={3}>아이디</Col>
                    <Col span={20}>{userInfo.userId}</Col>
                    <Col span={3}>학과</Col>
                    <Col span={21}>{userInfo.department}</Col>
                    <Col span={3}>학번</Col>
                    <Col span={21}>{userInfo.studentNumber}</Col>
                    <Col span={3}>이름</Col>
                    <Col span={21}>{userInfo.userName}</Col>
                    <Col span={3}>이메일</Col>
                    <Col span={21}>{userInfo.email}</Col>
                    <Col span={3}>상태</Col>
                    <Col span={21}>
                        <UserStatus status={userInfo.status} />
                    </Col>
                    <Col span={3}>타입</Col>
                    <Col span={21}>
                        <UserType type={userInfo.type} />
                    </Col>
                </Row>
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
