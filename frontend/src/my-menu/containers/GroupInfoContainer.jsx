import { useMutation, useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';
import { message, Modal, Collapse, Tag, Tooltip, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useStyles } from '../styles/groupInfo.style';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PageTitle from '../../common/components/PageTitle';
import {
    DELETE_GROUP,
    GET_GROUP,
    QUIT_GROUP_MEMBER,
    SELF_QUIT_GROUP_MEMBER,
} from '../../configs/queries';
import { useHistory } from 'react-router';
import moment from 'moment';
const { confirm } = Modal;

const { Panel } = Collapse;

export default function GroupInfoContainer({ id }) {
    const classes = useStyles();
    const history = useHistory();
    const [group, setGroup] = useState(null);
    const {
        data: groupData,
        loading: groupLoading,
        error: groupError,
        refetch: groupRefetch,
    } = useQuery(GET_GROUP, {
        variables: {
            id,
        },
    });
    const [deleteGroup] = useMutation(DELETE_GROUP);
    const [selfQuitGroupMember] = useMutation(SELF_QUIT_GROUP_MEMBER);

    useEffect(() => {
        if (groupData) {
            setGroup(groupData.getGroup);
        }
        if (groupError) {
            message.error('존재하지 않는 그룹입니다.');
            history.goBack();
        }
    }, [groupData, groupError, history]);

    const triggerSelfQuitGroup = (groupId) => {
        selfQuitGroupMember({
            variables: {
                groupId,
            },
        })
            .then(() => {
                message.success('그룹에서 탈퇴했습니다.');
                history.push('/my/group');
            })
            .catch(() => {
                message.error('그룹 탈퇴 중 문제가 발생했습니다.');
            });
    };
    const triggerDeleteGroup = (id) => {
        deleteGroup({
            variables: {
                id,
            },
        })
            .then(() => {
                message.success('그룹이 삭제되었습니다.');
                history.push('/my/group');
            })
            .catch(() => {
                message.error('그룹 삭제 중 문제가 발생했습니다.');
            });
    };
    const handleDeleteGroup = (e, id) => {
        confirm({
            title: '이 그룹을 삭제할까요?',
            content: '삭제된 그룹은 복구할 수 없습니다.',
            icon: <></>,
            okText: '그룹 삭제',
            cancelText: '취소',
            onOk() {
                triggerDeleteGroup(id);
            },
        });
        e.stopPropagation();
    };
    const handleSelfQuitGroup = (e, groupId) => {
        confirm({
            title: '이 그룹에서 탈퇴할까요?',
            content: '탈퇴 후 이 그룹의 마스터가 초대하기 전까지는 다시 가입할 수 없습니다.',
            icon: <></>,
            okText: '그룹 탈퇴',
            cancelText: '취소',
            onOk() {
                triggerSelfQuitGroup(groupId);
            },
        });
        e.stopPropagation();
    };

    return (
        <>
            {!groupLoading && group && (
                <>
                    <PageTitle title={group.title} />
                    <Collapse className={classes.groupInfoCollapse}>
                        <Panel
                            classname={classes.groupInfoPanel}
                            header="그룹 정보"
                            key="group-info"
                            extra={
                                group.masterId === group.userId ? (
                                    <Tooltip title="그룹 삭제">
                                        <DeleteOutlinedIcon
                                            className={classes.deleteIcon}
                                            onClick={(e) => handleDeleteGroup(e, group.id)}
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="그룹 탈퇴">
                                        <ExitToAppIcon
                                            className={classes.deleteIcon}
                                            onClick={(e) => handleSelfQuitGroup(e, group.id)}
                                        />
                                    </Tooltip>
                                )
                            }
                        >
                            <Grid className={classes.groupInfoWrapper} container>
                                <Grid item xs={12}>
                                    <div>
                                        <span className={classes.groupInfoTitle}>개설일</span>
                                        <span className={classes.groupMaster}>
                                            {new moment(group.createdAt).format('YYYY년 MM월 DD일')}
                                        </span>
                                    </div>
                                    <div className={classes.groupInfoItemWrapper}>
                                        <span className={classes.groupInfoTitle}>마스터</span>
                                        <span className={classes.groupMaster}>
                                            {group.masterGradeName}/{group.masterName}
                                        </span>
                                    </div>
                                    <div className={classes.groupInfoItemWrapper}>
                                        <span className={classes.groupInfoTitle}>멤버</span>
                                        <GroupMemberViewer
                                            groupId={group.id}
                                            members={group.members}
                                            refetch={groupRefetch}
                                            isMaster={group.masterId === group.userId}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Panel>
                    </Collapse>
                </>
            )}
        </>
    );
}

function GroupMemberViewer({ groupId, members, refetch, isMaster }) {
    const classes = useStyles();
    const [quitGroupMember] = useMutation(QUIT_GROUP_MEMBER);
    const triggerQuitGroupMember = (memberId) => {
        quitGroupMember({
            variables: {
                groupId,
                memberId,
            },
        })
            .then(() => {
                refetch();
                message.success('멤버를 삭제했습니다.');
            })
            .catch(() => {
                message.error('이미 삭제된 멤버입니다.');
            });
    };
    const handleDeleteGroupMember = (memberId) => {
        confirm({
            title: '멤버를 삭제할까요?',
            icon: <></>,
            okText: '멤버 삭제',
            cancelText: '취소',
            onOk() {
                triggerQuitGroupMember(memberId);
            },
        });
    };
    return (
        <>
            {members.length === 0 && '없음'}
            {members.map((member) => (
                <Tag key={`member-${member.memberId}`} className={classes.groupMember}>
                    <Space size={3}>
                        <span>
                            {member.memberGradeName}/{member.memberName}
                        </span>
                        {isMaster && (
                            <span>
                                <Tooltip title={`멤버 ${member.memberName} 삭제`}>
                                    <DeleteOutlinedIcon
                                        className={classes.deleteMemberIcon}
                                        onClick={() => handleDeleteGroupMember(member.memberId)}
                                    />
                                </Tooltip>
                            </span>
                        )}
                    </Space>
                </Tag>
            ))}
        </>
    );
}
