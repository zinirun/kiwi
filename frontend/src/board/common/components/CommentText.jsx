import React from 'react';
import { Button } from '@material-ui/core';
import 'antd/dist/antd.css';
import { Form, Input, Space } from 'antd';
import { useStyles } from '../styles/commentText.style';
import { boardCommonStyles } from '../styles/board.common.style';
const { TextArea } = Input;

export default function CommentText() {
    const classes = { ...useStyles(), ...boardCommonStyles() };

    return (
        <Form className={classes.commentForm}>
            <Form.Item className={classes.commentTextareaSection}>
                <TextArea rows={3} />
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
    );
}
