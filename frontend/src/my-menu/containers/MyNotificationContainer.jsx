import { useQuery, useMutation } from 'react-apollo';
import { message, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { GET_MY_NOTIFICATIONS, SEEN_NOTIFICATION } from '../../configs/queries';
import NoResult from '../../board/common/components/NoResult';
import { useStyles } from '../styles/notification.style';
import { commentTimeFormatter } from '../../board/common/tools/formatter';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';

export default function MyNotificationContainer() {
    const classes = useStyles();
    const history = useHistory();
    const [unreads, setUnreads] = useState([]);
    const {
        data: unreadData,
        loading: unreadLoading,
        error: unreadError,
        refetch: unreadRefetch,
    } = useQuery(GET_MY_NOTIFICATIONS);

    useEffect(() => {
        unreadRefetch().catch(() => {});
    }, [unreadRefetch]);

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
            {!unreadLoading && unreads.length > 0 && (
                <>
                    <div className={classes.notiActionWrapper}>
                        <Button size="small" className={classes.button}>
                            모든 알림 삭제
                        </Button>
                    </div>
                    {unreads.map((unread) => (
                        <NotificationViewer
                            id={unread.id}
                            type={unread.type}
                            count={unread.count}
                            date={unread.updatedAt}
                            targetId={unread.postId || unread.groupId}
                            key={`unread-${unread.id}`}
                            refetch={unreadRefetch}
                        />
                    ))}
                </>
            )}
        </>
    );
}

function NotificationViewer({ id, type, count, targetId, date, refetch }) {
    const classes = useStyles();
    const history = useHistory();
    const [seenNotification] = useMutation(SEEN_NOTIFICATION);
    let link = '';
    let messageText = '';
    // 알림 있으면 알림아이콘 옆에 불 띄우기
    // type group인거 제외하고 post면 게시글 제목, group이면 그룹 이름, comment면 댓글 콘텐츠 표시하기 (SQL에서)
    switch (type) {
        case 'POST_COMMENT':
            link = `/post/${targetId}`;
            messageText = `[] 게시물에 댓글이 ${count}개 달렸습니다.`;
            break;
        case 'POST_LIKE':
            link = `/post/${targetId}`;
            messageText = `[] 게시물에 좋아요가 ${count}개 달렸습니다.`;
            break;
        case 'COMMENT_LIKE':
            link = `/post/${targetId}`;
            messageText = `[] 댓글에 좋아요가 ${count}개 달렸습니다.`;
            break;
        case 'GROUP_INVITED':
            link = `/group/${targetId}`;
            messageText = `[] 그룹에 초대되었습니다.`;
            break;
        case 'GROUP_COMMENT':
            link = `/group/${targetId}`;
            messageText = `[] 그룹에 대화가 ${count}개 달렸습니다.`;
            break;
        case 'NOTICE':
            link = `/post/${targetId}`;
            messageText = `학과 공지[]가 게시되었습니다.`;
            break;
        default:
            break;
    }
    const handleNotiClick = (e) => {
        seenNotification({
            variables: {
                id,
            },
        })
            .then(() => {
                history.push(link);
            })
            .catch(() => {
                message.error('알림을 처리하는 중 문제가 발생했습니다.');
            });
        e.stopPropagation();
    };
    const handleCloseClick = (e) => {
        seenNotification({
            variables: {
                id,
            },
        })
            .then(() => {
                message.success('알림을 삭제했습니다.');
                refetch();
            })
            .catch(() => {
                message.error('알림을 처리하는 중 문제가 발생했습니다.');
            });
        e.stopPropagation();
    };
    return (
        <div className={classes.notificationWrapper} onClick={handleNotiClick}>
            <span className={classes.notificationMessage}>{messageText}</span>
            <span className={classes.notificationTime}>{commentTimeFormatter(date)}</span>
            <Tooltip title="이 알림 삭제">
                <CloseIcon onClick={handleCloseClick} className={classes.notificationIcon} />
            </Tooltip>
        </div>
    );
}
