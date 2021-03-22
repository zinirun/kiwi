import { Alert } from 'antd';
import React from 'react';
import PageTitle from '../../../common/components/PageTitle';
import TopListContainer from '../containers/TopListContainer';
import { LikeOutlined } from '@ant-design/icons';
import { TOP_BOARD_LIKE_COUNT } from '../../../configs/variables';
import QueryString from 'query-string';
import { useLocation } from 'react-router';

export default function TopPage() {
    const { search } = useLocation();
    const { page } = QueryString.parse(search);
    return (
        <>
            <PageTitle title="TOP 게시판" />
            <Alert
                message={`좋아요를 ${TOP_BOARD_LIKE_COUNT}개 이상 받은 게시글입니다.`}
                type="success"
                icon={<LikeOutlined />}
                showIcon
                style={{ marginBottom: 20 }}
            />
            <TopListContainer key="top-board" page={+page} />
        </>
    );
}
