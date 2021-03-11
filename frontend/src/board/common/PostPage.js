import React from 'react';
import Root from '../../header/Root';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Chip, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 730,
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
        borderBottom: '2px solid #ddd',
        width: 700,
    },
    pos: {
        marginBottom: 12,
    },
    upIcon: {
        fontSize: 15,
        color: theme.palette.primary.main,
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
    },
    backColor: {
        marginLeft: 5,
        background: 'white',
    },
}));

export default function PostPage() {
    const classes = useStyles();

    return (
        <Root>
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
                    </Typography>
                </CardContent>
                <CardActions>
                    <Chip
                        className={classes.backColor}
                        size="small"
                        icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                        label="1888"
                    />
                    <Chip
                        className={classes.backColor}
                        style={{ marginLeft: -9 }}
                        size="small"
                        icon={<ChatBubbleOutlineOutlinedIcon className={classes.commentIcon} />}
                        label="181"
                    />
                </CardActions>
            </Card>
        </Root>
    );
}
