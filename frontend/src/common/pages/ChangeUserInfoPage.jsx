import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Select, Collapse, Input } from 'antd';
import { useStyles } from '../static/signPages.style';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_USER, UPDATE_USER, UPDATE_USER_PASSWORD } from '../../configs/queries';
import { Button } from '@material-ui/core';
import { passwordValidator } from '../validators/signup.validator';
import { handleLogout } from '../../header/components/SideUserSection';

const { Panel } = Collapse;
const { Option } = Select;

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
