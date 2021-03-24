import { useQuery } from '@apollo/react-hooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { GET_MY_NOTIFICATIONS } from '../../configs/queries';

export default function MyNotificationContainer() {
    const history = useHistory();
    const [unreads, setUnreads] = useState([]);
    const {
        data: unreadData,
        loading: unreadLoading,
        error: unreadError,
        refetch: unreadRefetch,
    } = useQuery(GET_MY_NOTIFICATIONS);

    useEffect(() => {
        if (unreadData) {
            setUnreads(unreadData.getMyNotifications);
        }
        if (unreadError) {
            message.error('알림을 가져오는 중 문제가 발생했습니다.');
            history.goBack();
        }
    }, [unreadData, unreadError, history]);

    return (
        <>
            {unreads.map((unread) => (
                <p key={unread.id}>
                    {unread.id} {unread.type} {unread.count}
                </p>
            ))}
        </>
    );
}
