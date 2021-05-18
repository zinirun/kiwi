import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Select, Collapse, Input, Modal } from 'antd';
import { useStyles } from '../static/signPages.style';
import { useHistory } from 'react-router';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    GET_USER,
    UPDATE_USER,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_STATUS,
} from '../../configs/queries';
import { Button, TextField } from '@material-ui/core';
import { passwordValidator } from '../validators/signup.validator';
import { handleLogout } from '../../header/components/SideUserSection';

const { Panel } = Collapse;
const { Option } = Select;
const { confirm } = Modal;

export default function ChangeUserInfoPage(props) {
    const classes = useStyles();
    const [metadata, setMetadata] = useState(null);
    const [user, setUser] = useState(null);

    const { data: userData, error: userError } = useQuery(GET_USER);
    useEffect(() => {
        if (userData) {
            setUser(userData.getUser);
        }
        if (userError) {
            message.error('회원 정보를 불러오는 중 문제가 발생했습니다.');
            props.history.push('/');
        }
    }, [userData, userError, props.history]);

    useEffect(() => {
        axios
            .get('/api/user/metadata/signup')
            .then(({ data }) => {
                const { companies, studentGrades } = data;
                setMetadata({
                    studentGrades,
                    companies,
                });
            })
            .catch(() =>
                message.error(
                    '메타 정보를 불러오는 중 에러가 발생했습니다. 새로고침 후 다시 시도하세요.',
                ),
            );
    }, []);

    return (
        <>
            <PageTitle title="회원정보 수정" />
            {user && metadata && (
                <Collapse
                    className={classes.changeItemWrapper}
                    defaultActiveKey={['base-info', 'change-user-info']}
                >
                    <Panel header="변경 불가 항목" key="base-info">
                        <Row gutter={[12, 12]}>
                            <Col span={3}>아이디</Col>
                            <Col span={20}>{user.userAccount}</Col>
                            <Col span={3}>이름</Col>
                            <Col span={21}>{user.userName}</Col>
                            <Col span={3}>학번</Col>
                            <Col span={21}>{user.studentNumber}</Col>
                            <Col span={3}>학과</Col>
                            <Col span={21}>{user.department}</Col>
                        </Row>
                    </Panel>
                    <Panel header="기본 인적사항 변경" key="change-user-info">
                        <ChangeUserInfo user={user} metadata={metadata} />
                    </Panel>
                    <Panel header="비밀번호 변경" key="change-user-password">
                        <ChangeUserPassword />
                    </Panel>
                    <Panel header="서비스 탈퇴" key="user-quit">
                        <UserQuit />
                    </Panel>
                </Collapse>
            )}
        </>
    );
}

function ChangeUserPassword() {
    const classes = useStyles();
    const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD);
    const handlePasswordSubmit = (form) => {
        const { currentPassword, newPassword, newPasswordAgain } = form;
        const msg = passwordValidator(newPassword, newPasswordAgain);
        msg
            ? message.error(msg)
            : updateUserPassword({
                  variables: {
                      currentPassword,
                      newPassword,
                  },
              })
                  .then(() => {
                      handleLogout('changed=pw');
                  })
                  .catch(() => message.error('현재 비밀번호가 일치하지 않습니다.'));
    };
    return (
        <Form onFinish={handlePasswordSubmit}>
            <Form.Item
                name="currentPassword"
                className={classes.changeFormItem}
                label="현재 비밀번호"
            >
                <Input name="currentPassword" type="password" />
            </Form.Item>
            <Form.Item name="newPassword" className={classes.changeFormItem} label="변경 비밀번호">
                <Input name="newPassword" type="password" />
            </Form.Item>
            <Form.Item
                name="newPasswordAgain"
                className={classes.changeFormItem}
                label="비밀번호 확인"
            >
                <Input name="newPasswordAgain" type="password" />
            </Form.Item>
            <Form.Item className={classes.changeFormItem}>
                <Button type="submit" color="primary" className={classes.button} fullWidth>
                    비밀번호 변경
                </Button>
            </Form.Item>
        </Form>
    );
}

function ChangeUserInfo({ user, metadata }) {
    const classes = useStyles();
    const [updateUser] = useMutation(UPDATE_USER);
    const handleInfoSubmit = (user) => {
        updateUser({
            variables: {
                user,
            },
        })
            .then(() => {
                message.success('회원정보 수정이 완료되었습니다.');
            })
            .catch(() => {
                message.error('회원정보 변경 중 문제가 발생했습니다.');
            });
    };
    return (
        <Form onFinish={handleInfoSubmit}>
            <Form.Item
                name="studentGradeId"
                className={classes.changeFormItem}
                label="학년/졸업여부"
                initialValue={+user.studentGradeId}
            >
                <Select name="studentGradeId">
                    {metadata.studentGrades.map((d, idx) => (
                        <Option key={idx} value={d.id}>
                            {d.gradeName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item className={classes.changeFormItem}>
                <Button type="submit" color="primary" className={classes.button} fullWidth>
                    인적사항 변경
                </Button>
            </Form.Item>
        </Form>
    );
}

function UserQuit() {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState();
    const [updateUserStatus] = useMutation(UPDATE_USER_STATUS);

    const handleDelete = () => {
        confirm({
            title: '회원 탈퇴를 계속 진행 하시겠습니까?',
            content: '회원 탈퇴 후 계정을 복구할 수 없습니다.',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                updateUserStatus({
                    variables: {
                        status: 3,
                    },
                })
                    .then((result) => {
                        if (result.data.updateUserStatus) {
                            message.success('회원 탈퇴가 정상적으로 이루어졌습니다.');
                            history.push('/needsign');
                        }
                    })
                    .catch(() => {
                        message.error('회원 탈퇴 중 오류가 발생했습니다.');
                    });
            },
        });
    };
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <Form>
            <div>
                회원탈퇴를 진행하시려면 <strong>'키위를 탈퇴합니다.'</strong>를 입력해주세요.
            </div>
            <TextField
                multiline
                size="small"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                placeholder="키위를 탈퇴합니다."
            />
            <Form.Item className={classes.changeFormItem}>
                <Button
                    type="submit"
                    disabled={value === '키위를 탈퇴합니다.' ? false : true}
                    color="secondary"
                    style={
                        value === '키위를 탈퇴합니다.'
                            ? { background: '#F85D5D' }
                            : { background: '#C6C6C6' }
                    }
                    className={classes.quitButton}
                    onClick={handleDelete}
                    fullWidth
                >
                    회원 탈퇴
                </Button>
            </Form.Item>
        </Form>
    );
}
