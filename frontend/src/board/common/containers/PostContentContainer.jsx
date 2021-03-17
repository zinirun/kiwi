import React from 'react';
import { Grid, Chip, Card, CardContent, Typography } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import 'antd/dist/antd.css';
import { useStyles } from '../styles/postContent.style';

export default function PostContentContainer({ id }) {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <span className={classes.part}>학과질문</span>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        자연과학관 5층 화장실에서 냄새나요.
                    </Typography>
                    <Grid container justify="center" className={classes.userInfoSection}>
                        <Grid item xs={12} sm={6}>
                            <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                2020-12-31 14:00
                            </span>
                        </Grid>
                        <Grid item xs={12} sm={6} align="right">
                            <span style={{ color: '#999', fontSize: '0.75rem' }}>삼성/4학년</span>
                            <span> 신창우</span>
                        </Grid>
                    </Grid>
                    <div>
                        <Typography variant="body2" component="p">
                            안녕하세요. 김상배입니다.
                        </Typography>
                    </div>
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
        </>
    );
}
