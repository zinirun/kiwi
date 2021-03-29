import React, { useEffect, useState } from 'react';
import { useStyles } from '../static/style';
import { Badge, Button, Col, message, Popover, Row, Space, Tooltip } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { SettingFilled, BellFilled, LogoutOutlined, ToolOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    GET_LOCAL_UNREAD_COUNT,
    GET_NOTIFICATIONS_COUNT,
    UPDATE_LOCAL_UNREAD_COUNT,
} from '../../configs/queries';

export const handleLogout = (query = '') => {
    axios
        .post('/api/user/logout')
        .then(() => (window.location.href = `/needsign?${query}`))
        .catch(() => (window.location.href = '/'));
};

function UserToolContent() {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Button icon={<LogoutOutlined />} block onClick={() => handleLogout()}>
                로그아웃
            </Button>
            <Link to="/my/info">
                <Button icon={<ToolOutlined />} block>
                    회원정보 수정
                </Button>
            </Link>
        </Space>
    );
}

export default function SideUserSection({ user }) {
    const classes = useStyles();
    const history = useHistory();
    const [unreadCount, setUnreadCount] = useState(0);
    const { data: notiData, error: notiError, refetch: notiRefetch } = useQuery(
        GET_NOTIFICATIONS_COUNT,
    );
    const {
        data: localUnreadCountData,
        error: localUnreadCountError,
        loading: localUnreadCountLoading,
    } = useQuery(GET_LOCAL_UNREAD_COUNT);
    const [updateLocalUnreadCount] = useMutation(UPDATE_LOCAL_UNREAD_COUNT);

    useEffect(() => {
        history.listen(() => {
            notiRefetch()
                .then(({ data }) => {
                    const { getNotificationsCount: count } = data;
                    setUnreadCount(+count);
                })
                .catch(() => {});
        });
    }, [history, notiRefetch, unreadCount]);

    useEffect(() => {
        if (localUnreadCountData) {
            setUnreadCount(localUnreadCountData.unreadCount);
        }
        if (localUnreadCountError) {
            message.error('알림 캐시를 가져오는 중 문제가 발생했습니다.');
        }
    }, [localUnreadCountData, localUnreadCountError]);
    useEffect(() => {
        if (notiData) {
            updateLocalUnreadCount({
                variables: {
                    count: +notiData.getNotificationsCount,
                },
            });
        }
        if (notiError) {
            message.error('알림을 가져오는 중 문제가 발생했습니다.');
        }
    }, [notiData, notiError, updateLocalUnreadCount]);
    return (
        <Row className={classes.userSection}>
            <Col span={20}>
                <Space direction="vertical" size={1}>
                    <span className={classes.userSectionSmall}>
                        {user.department.substr(0, 9)}/{user.grade}
                    </span>
                    <span>{user.userName}</span>
                </Space>
            </Col>
            <Col span={4} align="right">
                <Space direction="vertical" size={1}>
                    <Popover title="회원 정보" content={UserToolContent} trigger="click">
                        <Tooltip title="회원 정보">
                            <SettingFilled className={classes.userToolButton} />
                        </Tooltip>
                    </Popover>
                    <Tooltip title="나의 알림">
                        <Link to="/my/notification" style={{ color: 'inherit' }}>
                            <Badge
                                className={classes.notiBadge}
                                dot={!localUnreadCountLoading && unreadCount > 0}
                            >
                                <BellFilled className={classes.userToolButton} />
                            </Badge>
                        </Link>
                    </Tooltip>
                </Space>
            </Col>
        </Row>
    );
}
