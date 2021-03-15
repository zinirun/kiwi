import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import 'antd/dist/antd.css';
import { Form, Input, Space } from 'antd';
import { useStyles } from '../styles/commentText.style';
const { TextArea } = Input;

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CommentText() {
    const classes = useStyles();

    return (
        <Form className={classes.commentForm}>
            <Form.Item className={classes.commentTextareaSection}>
                <TextArea rows={3} />
            </Form.Item>
            <Form.Item>
                <div className={classes.addCommentSection}>
                    <Space size={0}>
                        <FormControlLabel control={<GreenCheckbox />} label="익명" />
                        <Button type="submit" className={classes.button}>
                            댓글달기
                        </Button>
                    </Space>
                </div>
            </Form.Item>
        </Form>
    );
}
