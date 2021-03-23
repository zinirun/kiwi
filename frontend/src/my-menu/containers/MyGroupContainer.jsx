import { Button, Grid } from '@material-ui/core';
import { Form, Input, message, Space, Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_GROUP, GET_MY_GROUPS } from '../../configs/queries';
import { BoardListSkeleton } from '../../board/common/components/Skeletons';
import NoResult from '../../board/common/components/NoResult';
import { useStyles } from '../styles/group.style';
import { useMutation, useQuery } from 'react-apollo';

const { confirm } = Modal;

export default function MyGroupContainer() {
    const classes = useStyles();
    const [formVisible, setFormVisible] = useState(false);
    const [groups, setGroups] = useState([]);
    const {
        data: groupsData,
        error: groupsError,
        loading: groupsLoading,
        refetch: groupsRefetch,
    } = useQuery(GET_MY_GROUPS);
    const [createGroup] = useMutation(CREATE_GROUP);

    useEffect(() => {
        groupsRefetch().catch(() => {});
    }, [groupsRefetch]);

    useEffect(() => {
        if (groupsData) {
            setGroups(groupsData.getMyGroups);
        }
        if (groupsError) {
            message.error('그룹을 불러오는 중 문제가 발생했습니다.');
        }
    }, [groupsData, groupsError]);

    const triggerCreateGroup = (title) => {
        createGroup({
            variables: {
                title,
            },
        })
            .then(({ data }) => {
                const { createGroup } = data;
                message.success(`[${createGroup.title}] 그룹이 생성되었습니다.`);
                groupsRefetch().catch(() => {});
            })
            .catch(() => message.error('그룹 생성 중 문제가 발생했습니다.'));
    };
    const onSubmit = ({ title }) => {
        if (!title) {
            return message.error('그룹 이름을 입력하세요');
        }
        confirm({
            title: '그룹을 생성할까요?',
            icon: <></>,
            okText: '그룹 만들기',
            cancelText: '취소',
            onOk() {
                triggerCreateGroup(title);
            },
        });
    };
    const handleVisible = useCallback(
        (e) => {
            e.preventDefault();
            setFormVisible(!formVisible);
        },
        [formVisible],
    );
    return (
        <div>
            <Form onFinish={onSubmit}>
                <div className={classes.groupMenuWrapper}>
                    <Space>
                        {formVisible && (
                            <>
                                <Form.Item name="title" noStyle>
                                    <Input
                                        name="title"
                                        placeholder="그룹 이름을 입력하세요"
                                        maxLength={25}
                                        autoFocus
                                    />
                                </Form.Item>
                                <Button type="submit" className={classes.button} size="small">
                                    만들기
                                </Button>
                            </>
                        )}
                        <Button className={classes.button} size="small" onClick={handleVisible}>
                            {formVisible ? '취소' : '만들기'}
                        </Button>
                    </Space>
                </div>
            </Form>
            {groupsLoading && <BoardListSkeleton />}
            {!groupsLoading && groups.length === 0 && <NoResult title="나의 그룹" />}
            {!groupsLoading &&
                groups &&
                groups.map((group) => (
                    <Grid
                        key={`group-${group.id}`}
                        className={classes.groupWrapper}
                        container
                        component={Link}
                        to={`/group/${group.id}`}
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={7}>
                            <span className={classes.groupTitle}>{group.title}</span>
                        </Grid>
                        <Grid
                            item
                            className={classes.groupInfoWrapper}
                            xs={12}
                            sm={5}
                            align="right"
                        >
                            <Space direction="vertical" size={3}>
                                <div>
                                    <span className={classes.groupInfoTitle}>마스터</span>
                                    <span className={classes.groupMaster}>
                                        {group.masterGradeName}/{group.masterName}
                                    </span>
                                </div>
                                <div>
                                    <span className={classes.groupInfoTitle}>멤버</span>
                                    <span className={classes.groupMember}>
                                        {groupMemberPrinter(group.members)}
                                    </span>
                                </div>
                            </Space>
                        </Grid>
                    </Grid>
                ))}
        </div>
    );
}

function groupMemberPrinter(members) {
    if (members.length === 0) {
        return '없음';
    }
    if (members.length === 1) {
        return `${members[0].memberGradeName}/${members[0].memberName}`;
    }
    return `${members[0].memberGradeName}/${members[0].memberName} 외 ${members.length - 1}명`;
}
