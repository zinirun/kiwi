import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Chip,
    Card,
    CardContent,
    Typography,
    Button,
    FormControlLabel,
} from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import 'antd/dist/antd.css';
import { Comment, List, Form, Input, Row, Col } from 'antd';
import CommentList from './components/CommentList';
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
    postChip: {
        marginLeft: 5,
        background: 'white',
    },
    commentChip: {
        marginTop: 10,
        background: 'white',
    },
}));

export default function PostContent() {
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
                        안녕하세요. 김상배입니다.
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
            <CommentList />
        </>
    );
}
