import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import Root from '../../header/Root';
import { isMobile } from 'react-device-detect';

import PageTitle from '../../common/components/PageTitle';

const useStyles = makeStyles((theme) => ({
    content: {
        maxWidth: 730,
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: 5,
        padding: '13px 15px',
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
    title: {
        cursor: 'pointer',
    },
    backColor: {
        marginLeft: -9,
        background: '#fafafa',
    },
}));

export default function CommunityPage() {
    const classes = useStyles();

    return (
        <Root>
            <PageTitle title="학과 공지" />
            <Grid container justify="center" style={{ maxWidth: 730, marginBottom: 15 }}>
                <Grid item xs={12} sm={12} align="right">
                    <Button className={classes.button} size="small">
                        글쓰기
                    </Button>
                </Grid>
            </Grid>
            {/* {rows.map((row) => ( */}
            <Grid
                container
                justify="center"
                spacing={0}
                alignItems="center"
                className={classes.content}
            >
                <Grid item xs={12} sm={8} className={classes.title}>
                    <span className={classes.part}>학과질문</span>
                    {isMobile && <br />}
                    <span>자연과학관 5층 화장실에서 냄새나요</span>
                </Grid>
                <Grid item xs={12} sm={2} align="right" className={classes.icon}>
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
                        <span style={{ color: '#999', fontSize: '0.75rem' }}>삼성/4학년</span>신창우
                    </Grid>
                    {!isMobile && (
                        <Grid className={classes.date}>
                            <span>2021-3-20 22:10</span>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            {/* ))} */}
        </Root>
    );
}
