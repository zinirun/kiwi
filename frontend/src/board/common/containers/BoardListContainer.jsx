import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../styles/board.style';

export default function BoardListContainer() {
    const classes = useStyles();

    return (
        <>
            <Grid container justify="center" style={{ maxWidth: 730, marginBottom: 15 }}>
                <Grid item xs={12} sm={12} align="right">
                    <Button
                        component={Link}
                        to="/write?boardId=1&categoryId=1"
                        className={classes.button}
                        size="small"
                    >
                        글쓰기
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                justify="center"
                spacing={0}
                alignItems="center"
                className={classes.content}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    className={classes.title}
                    component={Link}
                    to={'/post'}
                    style={{ textDecoration: 'none' }}
                >
                    <span className={classes.part}>학과질문</span>
                    {isMobile && <br />}
                    <span style={{ color: 'black' }}>자연과학관 5층 화장실에서 냄새나요</span>
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <Chip
                        className={classes.backColor}
                        size="small"
                        icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                        label="18"
                    />
                    <Chip
                        className={classes.backColor}
                        size="small"
                        icon={<ChatBubbleOutlineOutlinedIcon className={classes.commentIcon} />}
                        label="181"
                    />
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <Grid>
                        <span style={{ color: '#999', fontSize: '0.75rem' }}>삼성/4학년</span>
                        <span>신창우</span>
                    </Grid>
                    {!isMobile && (
                        <Grid className={classes.date}>
                            <span>2021-3-20 22:10</span>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
