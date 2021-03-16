import React from 'react';
import { useStyles } from '../static/style';
import { Col, Popover, Row, Space } from 'antd';
import { SettingFilled, BellFilled } from '@ant-design/icons';

function UserToolContent() {
    return <div>123</div>;
}

function UserAlertContent() {
    return <div>123</div>;
}

export default function SideUserSection({ user }) {
    const classes = useStyles();
    return (
        <Row className={classes.userSection}>
            <Col span={16}>
                <Space direction="vertical" size={1}>
                    <span className={classes.userSectionSmall}>{user.department}</span>
                    <span>{user.userName}</span>
                </Space>
            </Col>
            <Col span={8} align="right">
                <Space direction="vertical" size={1}>
                    <Popover title="회원 정보" content={UserToolContent} trigger="click">
                        <SettingFilled className={classes.userToolButton} />
                    </Popover>
                    <Popover title="나의 알림" content={UserAlertContent} trigger="click">
                        <BellFilled className={classes.userToolButton} />
                    </Popover>
                </Space>
            </Col>
        </Row>
    );
}
