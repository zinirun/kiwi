import React from 'react';
import { useStyles } from '../static/style';
import { Button, Col, Popover, Row, Space, Tooltip } from 'antd';
import { SettingFilled, BellFilled, LogoutOutlined, ToolOutlined } from '@ant-design/icons';
import axios from 'axios';

function UserToolContent() {
    const handleLogout = () => {
        axios
            .post('/api/user/logout')
            .then(() => (window.location.href = '/'))
            .catch(() => (window.location.href = '/'));
    };
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Button icon={<LogoutOutlined />} block onClick={handleLogout}>
                로그아웃
            </Button>
            <Button icon={<ToolOutlined />} block>
                회원정보 수정
            </Button>
        </Space>
    );
}

function UserAlertContent() {
    return <div>알림이 없습니다.</div>;
}

export default function SideUserSection({ user }) {
    const classes = useStyles();
    return (
        <Row className={classes.userSection}>
            <Col span={16}>
                <Space direction="vertical" size={1}>
                    <span className={classes.userSectionSmall}>
                        {user.department}/{user.grade}
                    </span>
                    <span>{user.userName}</span>
                </Space>
            </Col>
            <Col span={8} align="right">
                <Space direction="vertical" size={1}>
                    <Popover content={UserToolContent} trigger="click">
                        <Tooltip title="회원 정보">
                            <SettingFilled className={classes.userToolButton} />
                        </Tooltip>
                    </Popover>
                    <Popover title="나의 알림" content={UserAlertContent} trigger="click">
                        <Tooltip title="나의 알림">
                            <BellFilled className={classes.userToolButton} />
                        </Tooltip>
                    </Popover>
                </Space>
            </Col>
        </Row>
    );
}
