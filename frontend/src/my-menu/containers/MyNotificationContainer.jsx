import { useQuery } from '@apollo/react-hooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { GET_MY_NOTIFICATIONS } from '../../configs/queries';
import NoResult from '../../board/common/components/NoResult';

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
            {!unreadLoading && unreads.length === 0 && <NoResult title="확인하지 않은 알림" />}
            {!unreadLoading &&
                unreads.length > 0 &&
                unreads.map((unread) => (
                    <NotificationViewer
                        id={unread.id}
                        type={unread.type}
                        count={unread.count}
                        targetId={unread.postId || unread.groupId}
                        key={`unread-${unread.id}`}
                    />
                ))}
        </>
    );
}

function NotificationViewer({ id, type, count, targetId }) {
    let link = '';
    let message = '';
    // 알림 있으면 알림아이콘 옆에 불 띄우기
    // type group인거 제외하고 post면 게시글 제목, group이면 그룹 이름 표시하기 (SQL에서)
    switch (type) {
        case 'POST_COMMENT':
            link = `/post/${targetId}`;
            message = `게시물에 댓글이 ${count}개 달렸습니다.`;
            break;
        case 'POST_LIKE':
            link = `/post/${targetId}`;
            message = `게시물에 좋아요가 ${count}개 달렸습니다.`;
            break;
        case 'COMMENT_LIKE':
            link = `/post/${targetId}`;
            message = `댓글에 좋아요가 ${count}개 달렸습니다.`;
            break;
        case 'GROUP_INVITED':
            link = `/group/${targetId}`;
            message = `그룹에 초대되었습니다.`;
            break;
        case 'GROUP_COMMENT':
            link = `/group/${targetId}`;
            message = `그룹에 대화가 ${count}개 달렸습니다.`;
            break;
        case 'NOTICE':
            link = `/post/${targetId}`;
            message = `학과 공지가 게시되었습니다.`;
            break;
        default:
            break;
    }
    return <p>{message}</p>;
}
