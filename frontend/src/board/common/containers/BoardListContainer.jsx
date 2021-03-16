import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Grid, Button, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../styles/board.style';
import SelectCategory from '../components/SelectCategory';
import { GET_POST_LIST } from '../../../configs/queries';
import moment from 'moment';

export default function BoardListContainer({ boardId }) {
    const classes = useStyles();
    const [postList, setPostList] = useState([]);
    const { data: postListData, error: postListError } = useQuery(GET_POST_LIST, {
        variables: {
            boardId: boardId,
        },
    });
    useEffect(() => {
        if (postListData) {
            setPostList(
                postListData.getPostsByBoardId.map((p) => {
                    return {
                        ...p,
                        updatedAt: new moment(p.updatedAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
    }, [postListData, setPostList]);

    return (
        <>
            <Grid container justify="center" style={{ maxWidth: 730, marginBottom: 15 }}>
                <Grid item xs={12} sm={10}>
                    {boardId === 3 && <SelectCategory />}
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <Button
                        component={Link}
                        to={`/write?boardId=${boardId}&categoryId=1`}
                        className={classes.button}
                        size="small"
                    >
                        글쓰기
                    </Button>
                </Grid>
            </Grid>
            {postList.map((post, idx) => (
                <Grid
                    container
                    justify="center"
                    spacing={0}
                    alignItems="center"
                    className={classes.content}
                    key={idx}
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
                        <span style={{ color: 'black' }}>{post.title}</span>
                    </Grid>
                    <Grid item xs={12} sm={2} align="right">
                        <Chip
                            className={classes.backColor}
                            size="small"
                            icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                            label={post.likeCount}
                        />
                        <Chip
                            className={classes.backColor}
                            size="small"
                            icon={<ChatBubbleOutlineOutlinedIcon className={classes.commentIcon} />}
                            label={post.commentCount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} align="right">
                        <Grid>
                            <span style={{ color: '#999', fontSize: '0.75rem' }}>
                                {post.gradeName}
                            </span>
                            <span>{post.userName}</span>
                        </Grid>
                        {!isMobile && (
                            <Grid className={classes.date}>
                                <span>{post.updatedAt}</span>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
