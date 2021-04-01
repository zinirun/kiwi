import { useQuery, useMutation } from 'react-apollo';
import { message, Tooltip, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
    GET_MY_NOTIFICATIONS,
    SEEN_ALL_NOTIFICATIONS,
    SEEN_NOTIFICATION,
    UPDATE_LOCAL_UNREAD_COUNT,
} from '../../configs/queries';
import NoResult from '../../board/common/components/NoResult';
import { useStyles } from '../styles/notification.style';
import { commentTimeFormatter } from '../../board/common/tools/formatter';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Grid } from '@material-ui/core';
const { confirm } = Modal;

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
    const [updateLocalUnreadCount] = useMutation(UPDATE_LOCAL_UNREAD_COUNT);
    const [seenAllNotifications] = useMutation(SEEN_ALL_NOTIFICATIONS);

    useEffect(() => {
        unreadRefetch().catch(() => {});
    }, [unreadRefetch]);

    useEffect(() => {
        if (unreadData) {
            const unreads = unreadData.getMyNotifications;
            setUnreads(unreads);
            updateLocalUnreadCount({
                variables: {
                    count: unreads.length,
                },
            });
        }
        if (unreadError) {
            message.error('알림을 가져오는 중 문제가 발생했습니다.');
            history.goBack();
        }
    }, [unreadData, unreadError, history, updateLocalUnreadCount]);

    const handleAllNotiCloseClick = () => {
        confirm({
            title: '모든 알림을 삭제할까요?',
            icon: <></>,
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                seenAllNotifications()
                    .then(() => {
                        unreadRefetch();
                        message.success('모든 알림을 삭제했습니다.');
                    })
                    .catch(() => {
                        message.error('알림 삭제 중 문제가 발생했습니다.');
                    });
            },
        });
    };

    return (
        <>
            {!unreadLoading && unreads.length === 0 && <NoResult title="확인하지 않은 알림" />}
            {!unreadLoading && unreads.length > 0 && (
                <>
                    <div className={classes.notiActionWrapper}>
                        <Button
                            size="small"
                            onClick={handleAllNotiCloseClick}
                            className={classes.button}
                        >
                            모든 알림 삭제
                        </Button>
                    </div>
                    {unreads.map((unread) => (
                        <NotificationViewer
                            id={unread.id}
                            type={unread.type}
                            count={unread.count}
                            date={unread.updatedAt}
                            extraResult={unread.extraResult}
                            targetId={unread.postId || unread.groupId}
                            key={`unread-${unread.id}`}
                            title={unread.titleLength > 8 ? unread.title + '..' : unread.title}
                            refetch={unreadRefetch}
                        />
                    ))}
                </>
            )}
        </>
    );
}

function NotificationViewer({ id, type, count, extraResult, targetId, date, refetch, title }) {
    const classes = useStyles();
    const history = useHistory();
    const [seenNotification] = useMutation(SEEN_NOTIFICATION);
    let link = '';
    let messageText = '';
    switch (type) {
        case 'POST_COMMENT':
            link = `/post/${targetId}`;
            messageText = `[${title}] 게시물에 댓글이 ${count}개 달렸습니다.`;
            break;
        case 'POST_LIKE':
            link = `/post/${targetId}`;
            messageText = `[${title}] 게시물에 좋아요가 ${count}개 달렸습니다.`;
            break;
        case 'COMMENT_LIKE':
            link = `/post/${targetId}`;
            messageText = `[${title}] 댓글에 좋아요가 ${count}개 달렸습니다.`;
            break;
        case 'GROUP_INVITED':
            link = `/group/${targetId}`;
            messageText = `[${title}] 그룹에 초대되었습니다.`;
            break;
        case 'GROUP_COMMENT':
            link = `/group/${targetId}`;
            messageText = `[${title}] 그룹에 대화가 ${count}개 달렸습니다.`;
            break;
        case 'POST_SPECIAL':
            link = `/post/${targetId}`;
            messageText = `[${title}]가 게시되었습니다.`;
            break;
        case 'REPORT_RESULT':
            messageText = `회원님의 신고가 처리되었습니다. 처리 결과: [${extraResult}]`;
            break;
        case 'POST_DELETED':
            messageText = `회원님의 게시글 [${title}]이 신고 처리에 의해 삭제되었습니다. 사유: [${extraResult}]`;
            break;
        case 'COMMENT_DELETED':
            messageText = `회원님의 댓글 [${title}]이 신고 처리에 의해 삭제되었습니다. 사유: [${extraResult}]`;
            break;
        case 'MAIN_NOTICE':
            messageText = `키위 공지가 추가되었습니다. [${extraResult}]`;
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
        <Grid container className={classes.notificationWrapper} onClick={handleNotiClick}>
            <Grid item xs={12} sm={9} className={classes.notificationMessage}>
                {messageText}
            </Grid>
            <Grid item xs={12} sm={3} className={classes.notificationTime} align="right">
                {commentTimeFormatter(date)}
                <Tooltip title="이 알림 삭제">
                    <CloseIcon onClick={handleCloseClick} className={classes.notificationIcon} />
                </Tooltip>
            </Grid>
        </Grid>
    );
}
