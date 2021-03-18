import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import 'antd/dist/antd.css';
import { Comment, List, Row, Col, message } from 'antd';
//import moment from 'moment';
//Tooltip
import { useStyles } from '../styles/commentList.style';
import { GET_COMMENTS } from '../../../configs/queries';

export default function CommentList({ id }) {
    const classes = useStyles();
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const { data: commentsData, error: commentsError } = useQuery(GET_COMMENTS, {
        variables: {
            id,
        },
    });
    useEffect(() => {
        if (commentsData) {
            setComments(
                commentsData.getCommentsByPostId.map((c) => {
                    return {
                        ...c,
                    };
                }),
            );
        }
        if (commentsError) {
            message.error('게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [commentsData, setComments, commentsError, history]);

    return (
        <>
            <div className={classes.comment}>
                <span>댓글</span>
            </div>
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item) => (
                    <li className={classes.commentField}>
                        <Row justify="center" align="center">
                            <Col span={21}>
                                <Comment
                                    author={item.authorName}
                                    content={item.content}
                                    //datetime={item.createdAt}
                                />
                            </Col>
                            <Col span={3} align="center">
                                <Chip
                                    className={classes.commentChip}
                                    size="small"
                                    icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                                    label={item.likeCount}
                                />
                            </Col>
                        </Row>
                    </li>
                )}
            />
        </>
    );
}
