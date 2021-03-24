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
const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;

export default function CommentList({ id }) {
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
            message.error('댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
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
                message.success('댓글이 삭제되었습니다.');
                commentsRefetch();
            })
            .catch(() => {
                message.error('게시글 삭제 중 오류가 발생했습니다.');
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
            })
            .catch(() => message.error('댓글 등록 중 오류가 발생했습니다.'));
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
                    message.success('좋아요!');
                } else {
                    message.success('좋아요가 취소되었습니다.');
                }
                commentsRefetch();
            })
            .catch(() => message.error('댓글 좋아요 중 문제가 발생했습니다.'));
    };
    const handleDelete = (id) => {
        confirm({
            title: '댓글을 삭제할까요?',
            content: '삭제된 댓글은 복구할 수 없습니다.',
            okText: '삭제',
            cancelText: '취소',
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
                    <MyGroupListContainer
                        visible={groupModalVisible}
                        setVisible={setGroupModalVisible}
                        groupMember={groupMember}
                    />
                    <div className={classes.comment}>
                        <span>댓글</span>
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
                                                <Tooltip title="댓글 삭제">
                                                    <CloseIcon
                                                        post={item.postId}
                                                        onClick={() => handleDelete(item.id)}
                                                        className={classes.extraIcon}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="내 속닥속닥에 초대">
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
                                        댓글달기
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
    const { data: groupsData, error: groupsError, loading: groupsLoading } = useQuery(
        GET_MY_MASTER_GROUPS,
    );
    useEffect(() => {
        if (groupsData) {
            const groups = groupsData.getMyMasterGroups;
            if (groups.length === 0) {
                message.error('내 그룹이 없습니다. 속닥속닥에서 그룹을 만드세요!');
                setVisible(false);
            }
            setGroups(groups);
        }
        if (groupsError) {
            message.error('내 그룹을 가져오는 중 문제가 발생했습니다.');
            setVisible(false);
        }
    }, [groupsData, groupsError, setVisible]);
    const handleChange = useCallback((id) => {
        setSelectedGroupId(id);
    }, []);
    const handleOk = () => {
        if (!selectedGroupId) {
            message.error('초대할 그룹을 선택하세요.');
            return;
        }
        inviteGroupMember({
            variables: {
                groupId: selectedGroupId,
                memberId: groupMember.memberId,
            },
        })
            .then(() => {
                message.success(`${groupMember.memberName}님을 그룹에 초대했어요!`);
            })
            .catch(() => {
                message.error(`${groupMember.memberName}님은 이미 초대된 멤버입니다.`);
            });
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Modal
            title="내 속닥속닥에 초대하기"
            visible={visible || false}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="초대하기"
            cancelText="취소"
        >
            {!groupsLoading && groups && groupMember && (
                <>
                    <p>{groupMember.memberName}님을 초대할 그룹을 선택하세요.</p>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="초대할 그룹을 선택하세요"
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
                    ,
                </>
            )}
        </Modal>
    );
}
