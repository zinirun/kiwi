import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import 'antd/dist/antd.css';
import { Form, Input } from 'antd';
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
        <>
            <Form.Item>
                <TextArea rows={4} style={{ maxWidth: 730, marginTop: 15, height: 70 }} />
            </Form.Item>
            <Form.Item style={{ maxWidth: 730, marginTop: -15 }}>
                <div className={classes.addCommentSection}>
                    <Button type="submit" className={classes.button}>
                        댓글달기
                    </Button>
                    <FormControlLabel control={<GreenCheckbox />} label="익명" />
                </div>
            </Form.Item>
        </>
    );
}
