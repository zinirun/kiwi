import React, { useCallback, useEffect, useState } from 'react';
import PageTitle from '../../common/components/PageTitle';
import { useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_IS_ADMIN } from '../../configs/queries';
import { useHistory } from 'react-router';
import { Layout, Menu } from 'antd';
import UserContainer from '../containers/UserContainer';
import PostContainer from '../containers/PostContainer';

const { Content, Sider } = Layout;

export default function AdminPage() {
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuKey, setMenuKey] = useState(0);
    const { data: isAdminData, loading: isAdminLoading } = useQuery(GET_LOCAL_IS_ADMIN);
    useEffect(() => {
        if (isAdminData) {
            const isAdmin = isAdminData.isAdmin;
            isAdmin ? setIsAdmin(true) : history.push('/');
        }
    }, [isAdminData, history]);

    const handleMenu = useCallback(({ key }) => {
        setMenuKey(key);
    }, []);

    return (
        <>
            {!isAdminLoading && isAdmin && <PageTitle title="관리자 페이지" />}
            <Layout>
                <Sider width={150}>
                    <Menu mode="inline" style={{ height: '100%' }} onSelect={handleMenu}>
                        <Menu.Item key="report">신고</Menu.Item>
                        <Menu.Item key="department">학과</Menu.Item>
                        <Menu.Item key="user">회원</Menu.Item>
                        <Menu.Item key="board">게시판</Menu.Item>
                        <Menu.Item key="category">카테고리</Menu.Item>
                        <Menu.Item key="post">게시글</Menu.Item>
                        <Menu.Item key="comment">댓글</Menu.Item>
                        <Menu.Item key="groups">속닥속닥</Menu.Item>
                        <Menu.Item key="adminLog">로그</Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ padding: 10, minHeight: '800px', background: 'white' }}>
                    {menuKey === 'user' && <UserContainer />}
                    {menuKey === 'post' && <PostContainer />}
                </Content>
            </Layout>
        </>
    );
}
