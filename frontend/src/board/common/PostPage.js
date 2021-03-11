import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
    Grid,
    Chip,
    Card,
    CardContent,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import 'antd/dist/antd.css';
import { Comment, Tooltip, List, Form, Input, Row, Col } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 730,
        border: '1px solid #ddd',
        boxShadow: 'none',
        marginBottom: 15,
    },
    part: {
        background: theme.palette.primary.main,
        width: 70,
        padding: '2px 6px',
        fontSize: 12,
        color: 'white',
        borderRadius: '10px',
        marginRight: 5,
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        borderBottom: '1px solid #ddd',
        width: 700,
    },
    upIcon: {
        fontSize: 15,
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },
    commentIcon: {
        fontSize: 15,
        marginLeft: 15,
        color: theme.palette.primary.main,
    },
    date: {
        fontSize: 12,
        color: '#BBBBBB',
    },
    icon: {},
    button: {
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        background: theme.palette.primary.main,
        borderRadius: 5,
    },
    postChip: {
        marginLeft: 5,
        background: 'white',
    },
    commentChip: {
        marginTop: 10,
        background: 'white',
    },
    commentField: {
        maxWidth: 730,
        background: 'white',
        border: '1px solid #ddd',
        paddingLeft: 10,
        marginBottom: 5,
    },
    comment: {
        marginBottom: 5,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    addCommentSection: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
}));

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

export default function PostPage() {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <span className={classes.part}>학과질문</span>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        자연과학관 5층 화장실에서 냄새나요.
                    </Typography>
                    <Grid align="right">
                        <span style={{ color: '#999', fontSize: '0.75rem' }}>삼성/4학년</span>
                        <span>신창우</span>
                    </Grid>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                        <br />
                        well meaning and kindly.
                    </Typography>
                </CardContent>
                <Grid align="right">
                    <Chip
                        className={classes.postChip}
                        size="small"
                        icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                        label="1888"
                    />
                    <Chip
                        className={classes.postChip}
                        size="small"
                        icon={<ChatBubbleOutlineOutlinedIcon className={classes.commentIcon} />}
                        label="181"
                    />
                </Grid>
            </Card>
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
            <Form.Item>
                <TextArea rows={4} style={{ maxWidth: 730, marginTop: 15 }} />
            </Form.Item>
            <Form.Item style={{ maxWidth: 730, marginTop: -15 }}>
                <div className={classes.addCommentSection}>
                    <Button htmlType="submit" className={classes.button}>
                        댓글달기
                    </Button>
                    <FormControlLabel control={<GreenCheckbox />} label="익명" />
                </div>
            </Form.Item>
        </>
    );
}
