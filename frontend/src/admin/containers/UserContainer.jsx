import React, { useState } from 'react';
import { Input, Row, Col, message, Button, Modal } from 'antd';
import { Grid } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import {
    SEARCH_USER_BY_USER_ID,
    SEARCH_USER_BY_STUDENT_NUMBER,
    UPDATE_STATUS,
    UPDATE_TYPE,
} from '../../configs/queries';
import { useStyles } from '../styles/admin.style';
const { Search } = Input;
const { confirm } = Modal;

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
    const [updateStatus] = useMutation(UPDATE_STATUS);
    const [updateType] = useMutation(UPDATE_TYPE);

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

    const handleStatus = (e) => {
        const status = e.currentTarget.value;
        confirm({
            title: '회원 정지/해제 처리 하시겠습니까?',
            content:
                '회원 정지/해제 처리 후 복구할 수 있습니다. 다시 조회하시면 변경사항 확인이 가능합니다.',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                updateStatus({
                    variables: {
                        status: status,
                        id: userInfo.id,
                    },
                })
                    .then((result) => {
                        if (result.data.updateStatus) {
                            if (status === '2') {
                                message.success('회원 정지 처리 되었습니다.');
                            } else {
                                message.success('회원 정지 해제 처리 되었습니다.');
                            }
                        }
                    })
                    .catch(() => {
                        if (status === '2') {
                            message.error('회원 정지 처리 중 오류가 발생했습니다.');
                        } else {
                            message.error('회원 정지 해제 처리 중 오류가 발생했습니다.');
                        }
                    });
            },
        });
    };

    const handleType = (e) => {
        const type = e.currentTarget.value;
        confirm({
            title: '회원 타입을 변경할까요?',
            content:
                '타입 변경 후 복구할 수 있습니다. 다시 조회하시면 변경 사항 확인이 가능합니다.',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                updateType({
                    variables: {
                        type: type,
                        id: userInfo.id,
                    },
                })
                    .then((result) => {
                        if (result.data.updateType) {
                            message.success('회원 타입이 변경되었습니다.');
                        }
                    })
                    .catch(() => {
                        message.error('회원 타입 변경 중 오류가 발생했습니다.');
                    });
            },
        });
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Search
                        placeholder="고유아이디로 조회"
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
                            <Button
                                type="primary"
                                danger
                                size="middle"
                                value="2"
                                className={classes.button}
                                onClick={handleStatus}
                            >
                                정지
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                type="primary"
                                size="middle"
                                value="1"
                                className={classes.button}
                                onClick={handleStatus}
                            >
                                정지해제
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.buttonSection}>
                        {buttonData.map((b, idx) => (
                            <Grid key={idx} item xs={12} sm={2}>
                                <Button
                                    type="primary"
                                    size="middle"
                                    danger={b.type === 9 ? true : false}
                                    value={b.type}
                                    className={classes.button}
                                    onClick={handleType}
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
