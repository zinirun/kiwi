import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Chip, Button, Grid } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import CloseIcon from '@material-ui/icons/Close';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { message, Form, Input, Space, Modal, Tooltip, Select } from 'antd';
import { useStyles } from '../styles/comment.style';
import { boardCommonStyles } from '../styles/board.common.style';
import {
    CREATE_COMMENT,
    GET_COMMENTS,
    HANDLE_COMMENT_LIKE,
    DELETE_COMMENT,
    INVITE_GROUP_MEMBER,
    GET_MY_MASTER_GROUPS,
} from '../../../configs/queries';
import { commentTimeFormatter } from '../tools/formatter';
import { PostCommentSkeleton } from '../components/Skeletons';
import { Link } from 'react-router-dom';
const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;

export default function CommentList({ id, postRefetch }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [form] = Form.useForm();
    const [comments, setComments] = useState([]);
    const {
        data: commentsData,
        error: commentsError,
        loading: commentsLoading,
        refetch: commentsRefetch,
    } = useQuery(GET_COMMENTS, {
        variables: {
            id,
        },
    });
    const [createComment] = useMutation(CREATE_COMMENT);
    const [handleCommentLike] = useMutation(HANDLE_COMMENT_LIKE);
    const [deleteComment] = useMutation(DELETE_COMMENT);
    const [groupModalVisible, setGroupModalVisible] = useState(false);
    const [groupMember, setGroupMember] = useState(null);

    useEffect(() => {
        if (commentsData) {
            setComments(
                commentsData.getCommentsByPostId.map((c) => {
                    return {
                        ...c,
                        createdAt: commentTimeFormatter(c.createdAt),
                    };
                }),
            );
        }
        if (commentsError) {
            message.error('????????? ???????????? ??? ????????? ??????????????????. ?????? ??????????????????.');
            history.push('/');
        }
    }, [commentsData, setComments, commentsError, history]);

    const triggerDeleteComment = (id) => {
        deleteComment({
            variables: {
                id,
            },
        })
            .then(() => {
                message.success('????????? ?????????????????????.');
                commentsRefetch();
            })
            .catch(() => {
                message.error('????????? ?????? ??? ????????? ??????????????????.');
            });
    };

    const handleCommentSubmit = ({ content }) => {
        if (!content || !content.replaceAll(' ', '')) return;
        createComment({
            variables: {
                comment: {
                    postId: id,
                    content,
                },
            },
        })
            .then(() => {
                form.resetFields();
                commentsRefetch();
                postRefetch();
            })
            .catch(() => message.error('?????? ?????? ??? ????????? ??????????????????.'));
    };

    const handleLike = (e) => {
        e.preventDefault();
        handleCommentLike({
            variables: {
                commentId: e.currentTarget.getAttribute('value'),
            },
        })
            .then(({ data }) => {
                const { handleCommentLike: result } = data;
                if (result === 'Up') {
                    message.success('?????????!');
                } else {
                    message.success('???????????? ?????????????????????.');
                }
                commentsRefetch();
            })
            .catch(() => message.error('?????? ????????? ??? ????????? ??????????????????.'));
    };
    const handleDelete = (id) => {
        confirm({
            title: '????????? ????????????????',
            content: '????????? ????????? ????????? ??? ????????????.',
            okText: '??????',
            cancelText: '??????',
            onOk() {
                triggerDeleteComment(id);
            },
        });
    };
    const handleVisibleClick = (item) => {
        setGroupMember({
            memberName: item.authorName,
            memberId: item.authorId,
        });
        setGroupModalVisible(true);
    };
    return (
        <>
            {commentsLoading && <PostCommentSkeleton />}
            {!commentsLoading && (
                <>
                    {groupModalVisible && groupMember && (
                        <MyGroupListContainer
                            visible={groupModalVisible}
                            setVisible={setGroupModalVisible}
                            groupMember={groupMember}
                        />
                    )}

                    <div className={classes.comment}>
                        <span>??????</span>
                    </div>
                    {comments.length > 0 &&
                        comments.map((item) => (
                            <Grid
                                key={item.id}
                                container
                                className={classes.commentField}
                                style={{
                                    backgroundColor: item.authorId === item.userId && '#f1fff4',
                                }}
                            >
                                <Grid container className={classes.flexWrapper}>
                                    <Grid item style={{ flex: 1 }}>
                                        <span className={classes.authorInfo}>{item.gradeName}</span>
                                        <span className={classes.author}>{item.authorName}</span>
                                        <span className={classes.date}>{item.createdAt}</span>
                                    </Grid>
                                    <Grid item>
                                        <Space size={3}>
                                            {item.authorId === item.userId ? (
                                                <Tooltip title="?????? ??????">
                                                    <CloseIcon
                                                        post={item.postId}
                                                        onClick={() => handleDelete(item.id)}
                                                        className={classes.extraIcon}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="??? ??????????????? ??????">
                                                    <GroupAddIcon
                                                        className={classes.extraIcon}
                                                        onClick={() => handleVisibleClick(item)}
                                                    />
                                                </Tooltip>
                                            )}
                                            <Chip
                                                className={classes.commentChip}
                                                size="small"
                                                icon={
                                                    <ThumbUpOutlinedIcon
                                                        value={item.id}
                                                        onClick={handleLike}
                                                        className={classes.upIcon}
                                                    />
                                                }
                                                label={item.likeCount}
                                            />
                                        </Space>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    {item.content.split('\n').map((text, idx) => (
                                        <p key={idx} className={classes.commentLine}>
                                            {text}
                                        </p>
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                    <Form
                        form={form}
                        onFinish={handleCommentSubmit}
                        className={classes.commentForm}
                    >
                        <Form.Item name="content" className={classes.commentTextareaSection}>
                            <TextArea name="content" rows={3} allowClear maxLength={99} />
                        </Form.Item>
                        <Form.Item>
                            <div className={classes.addCommentSection}>
                                <Space size={0}>
                                    <Button type="submit" className={classes.button}>
                                        ????????????
                                    </Button>
                                </Space>
                            </div>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
    );
}

function MyGroupListContainer({ visible, setVisible, groupMember }) {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [inviteGroupMember] = useMutation(INVITE_GROUP_MEMBER);
    const {
        data: groupsData,
        error: groupsError,
        loading: groupsLoading,
        refetch: groupsRefetch,
    } = useQuery(GET_MY_MASTER_GROUPS);
    useEffect(() => {
        groupsRefetch().catch(() => {});
    }, [groupsRefetch]);
    useEffect(() => {
        if (groupsData) {
            const groups = groupsData.getMyMasterGroups;
            setGroups(groups);
        }
        if (groupsError) {
            message.error('??? ????????? ???????????? ??? ????????? ??????????????????.');
            setVisible(false);
        }
    }, [groupsData, groupsError, setVisible]);
    const handleChange = useCallback((id) => {
        setSelectedGroupId(id);
    }, []);
    const handleOk = () => {
        if (!selectedGroupId) {
            message.error('????????? ????????? ???????????????.');
            return;
        }
        inviteGroupMember({
            variables: {
                groupId: selectedGroupId,
                memberId: groupMember.memberId,
            },
        })
            .then(() => {
                message.success(`${groupMember.memberName}?????? ????????? ???????????????!`);
            })
            .catch(() => {
                message.error(`${groupMember.memberName}?????? ?????? ????????? ???????????????.`);
            });
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <>
            {!groupsLoading && groups && groupMember && (
                <Modal
                    title="??? ??????????????? ????????????"
                    visible={visible || false}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="????????????"
                    cancelText="??????"
                    okButtonProps={{ disabled: groups.length === 0 && true }}
                >
                    {groups.length === 0 && (
                        <p>
                            ??? ????????? ????????????. <Link to="/my/group">????????????</Link>?????? ?????????
                            ????????????!
                        </p>
                    )}
                    {groups.length > 0 && (
                        <>
                            <p>{groupMember.memberName}?????? ????????? ????????? ???????????????.</p>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="????????? ????????? ???????????????"
                                onChange={handleChange}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {groups.map((group) => (
                                    <Option value={group.id} key={`my-group-${group.id}`}>
                                        {group.title}
                                    </Option>
                                ))}
                            </Select>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
}
