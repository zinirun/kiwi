import React from 'react';
import PageTitle from '../../common/components/PageTitle';
import QueryString from 'query-string';
import { useLocation } from 'react-router';

export default function MyNotificationPage() {
    const { search } = useLocation();
    const { page } = QueryString.parse(search);
    return (
        <>
            <PageTitle title="나의 알림" />
        </>
    );
}
