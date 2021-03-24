import { useMutation, useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';
import { message, Modal, Collapse, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useStyles } from '../styles/groupInfo.style';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PageTitle from '../../common/components/PageTitle';
import { GET_GROUP, QUIT_GROUP_MEMBER } from '../../configs/queries';
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

    useEffect(() => {
        if (groupData) {
            setGroup(groupData.getGroup);
        }
        if (groupError) {
            message.error('존재하지 않는 그룹입니다.');
            history.goBack();
        }
    }, [groupData, groupError, history]);

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
                                <Tooltip title="그룹 삭제">
                                    <DeleteOutlinedIcon className={classes.deleteIcon} />
                                </Tooltip>
                            }
                        >
                            <Grid className={classes.groupInfoWrapper} container>
                                <Grid item xs={12} sm={10}>
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

function GroupMemberViewer({ groupId, members, refetch }) {
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
                message.error('멤버 삭제 중 문제가 발생했습니다.');
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
                <Tag
                    key={`member-${member.memberId}`}
                    className={classes.groupMember}
                    closable
                    onClose={() => handleDeleteGroupMember(member.memberId)}
                >
                    {member.memberGradeName}/{member.memberName}
                </Tag>
            ))}
        </>
    );
}
