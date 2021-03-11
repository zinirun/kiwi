import React from 'react';
import { Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import 'antd/dist/antd.css';
import { Comment, Tooltip, List, Row, Col } from 'antd';
import moment from 'moment';
import { useStyles } from '../styles/commentList.style';

const data = [
    {
        author: '허전진',
        content: <p>혹시 우리 프로그램 자주 보세요??</p>,
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        author: '이건욱',
        content: (
            <p>
                저희가 자주 보죠~! 무야~호~!
                무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!무야~호~!
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

export default function CommentList() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.comment}>
                <span>댓글</span>
            </div>
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <li className={classes.commentField}>
                        <Row justify="center" align="center">
                            <Col span={21}>
                                <Comment
                                    author={item.author}
                                    content={item.content}
                                    datetime={item.datetime}
                                />
                            </Col>
                            <Col span={3} align="center">
                                <Chip
                                    className={classes.commentChip}
                                    size="small"
                                    icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                                    label="1888"
                                />
                            </Col>
                        </Row>
                    </li>
                )}
            />
        </>
    );
}
