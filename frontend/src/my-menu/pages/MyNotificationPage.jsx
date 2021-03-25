import React from 'react';
import PageTitle from '../../common/components/PageTitle';
import MyNotificationContainer from '../containers/MyNotificationContainer';

export default function MyNotificationPage() {
    return (
        <>
            <PageTitle title="나의 알림" />
            <MyNotificationContainer />
        </>
    );
}
