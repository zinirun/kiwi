import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Button, Chip } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { isMobile } from 'react-device-detect';
import { useStyles } from '../styles/board.style';
import { boardCommonStyles } from '../styles/board.common.style';
import SelectCategory from '../components/SelectCategory';
import { GET_POST_LIST } from '../../../configs/queries';
import moment from 'moment';
import { message } from 'antd';
import NoResult from '../components/NoResult';

export default function BoardListContainer({ boardId }) {
    const classes = { ...useStyles(), ...boardCommonStyles() };
    const history = useHistory();
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [postList, setPostList] = useState([]);
    const {
        data: postListData,
        error: postListError,
        loading: postListLoading,
        refetch: postListRefetch,
    } = useQuery(GET_POST_LIST, {
        variables: {
            boardId: boardId,
            categoryId: selectedCategoryId,
        },
    });
    useEffect(() => {
        postListRefetch();
    }, [selectedCategoryId, postListRefetch]);

    useEffect(() => {
        if (postListData) {
            setPostList(
                postListData.getPostsByBoardId.map((p) => {
                    return {
                        ...p,
                        createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (postListError) {
            message.error('게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            history.push('/');
        }
    }, [postListData, setPostList, postListError, history]);

    return (
        <>
            <Grid container justify="center" style={{ marginBottom: 15 }}>
                <Grid item xs={12} sm={10}>
                    <SelectCategory
                        boardId={boardId}
                        value={selectedCategoryId}
                        setValue={setSelectedCategoryId}
                    />
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <Button
                        component={Link}
                        to={`/write?boardId=${boardId}`}
                        className={classes.button}
                        size="small"
                    >
                        글쓰기
                    </Button>
                </Grid>
            </Grid>
            {!postListLoading && postList.length === 0 && <NoResult />}
            {postList.map((post, idx) => (
                <Grid
                    container
                    justify="center"
                    spacing={0}
                    alignItems="center"
                    className={classes.postWrapper}
                    component={Link}
                    to={`/post/${post.id}`}
                    key={idx}
                >
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        className={classes.title}
                        style={{ textDecoration: 'none' }}
                    >
                        {post.categoryName && (
                            <span className={classes.part}>{post.categoryName}</span>
                        )}
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
                            <span> {post.authorName}</span>
                        </Grid>
                        {!isMobile && (
                            <Grid className={classes.date}>
                                <span>{post.createdAt}</span>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
