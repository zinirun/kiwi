// import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-apollo';
// import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
// import { Grid, Chip } from '@material-ui/core';
// import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
// import { useStyles } from '../../board/common/styles/board.style';
// import { boardCommonStyles } from '../../board/common/styles/board.common.style';
// import moment from 'moment';
// import { message, Pagination } from 'antd';
// import NoResult from '../../board/common/components/NoResult';
// import { BoardListSkeleton } from '../../board/common/components/Skeletons';
// import { commentTimeFormatter } from '../../board/common/tools/formatter';
// import { ITEMS_COUNT_PER_PAGE } from '../../configs/variables';
// import { GET_SCRAP, GET_SCRAP_COUNT } from '../../configs.queries';

// export default function MyScrapContainer({ page }) {
//     const classes = { ...useStyles(), ...boardCommonStyles() };
//     const history = useHistory();
//     const [postList, setPostList] = useState([]);
//     const [postsCount, setPostsCount] = useState();

//     const { data: postsCountData, error: postsCountError } = useQuery(GET_SCRAP_COUNT);
//     const {
//         data: postListData,
//         error: postListError,
//         loading: postListLoading,
//         refetch: postListRefetch,
//     } = useQuery(GET_SCRAP, {
//         variables: {
//             pageNumber: page || 1,
//             elementCount: ITEMS_COUNT_PER_PAGE,
//         },
//     });

//     useEffect(() => {
//         if (postsCountData) {
//             setPostsCount(postsCountData.getScrapCount);
//         }
//         if (postsCountError) {
//             message.error('스크랩 게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
//             history.push('/');
//         }
//     }, [postsCountData, postsCountError, history]);

//     useEffect(() => {
//         postListRefetch().catch(() => {});
//     }, [postListRefetch]);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         if (postListData) {
//             const posts = postListData.getScrap;
//             setPostList(
//                 posts.map((p) => {
//                     return {
//                         ...p,
//                         createdAt: new moment(p.createdAt).format('YYYY-MM-DD HH:mm'),
//                     };
//                 }),
//             );
//         }
//         if (postListError) {
//             message.error('스크랩 게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
//             history.push('/');
//         }
//     }, [postListData, setPostList, postListError, history]);

//     return (
//         <>
//             {postListLoading && <BoardListSkeleton />}
//             {!postListLoading && postList.length === 0 && <NoResult />}
//             {!postListLoading && postList.length > 0 && (
//                 <>
//                     {postList.map((post, idx) => (
//                         <Grid
//                             container
//                             className={classes.postWrapper}
//                             component={Link}
//                             to={`/post/${post.id}`}
//                             key={idx}
//                         >
//                             <Grid item className={classes.title} xs={12}>
//                                 <span style={{ color: 'black' }}>
//                                     {post.categoryName && (
//                                         <span className={classes.part}>{post.categoryName}</span>
//                                     )}
//                                     {post.title}
//                                 </span>
//                             </Grid>
//                             <Grid className={classes.flexWrapper} container>
//                                 <Grid item style={{ flex: 1 }}>
//                                     <span className={classes.infoWrapper}>
//                                         {commentTimeFormatter(post.createdAt)}&nbsp;
//                                         <span className={classes.author}>
//                                             {post.gradeName}/{post.authorName}
//                                         </span>
//                                     </span>
//                                 </Grid>
//                                 <Grid item>
//                                     <Chip
//                                         className={classes.backColor}
//                                         size="small"
//                                         icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
//                                         label={post.likeCount}
//                                     />
//                                     <Chip
//                                         className={classes.backColor}
//                                         size="small"
//                                         icon={
//                                             <ChatBubbleOutlineOutlinedIcon
//                                                 className={classes.commentIcon}
//                                             />
//                                         }
//                                         label={post.commentCount}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     ))}
//                     <Pagination
//                         className={classes.paginationWrapper}
//                         defaultCurrent={page || 1}
//                         defaultPageSize={ITEMS_COUNT_PER_PAGE}
//                         total={postsCount}
//                         //onChange={handlePage}
//                         hideOnSinglePage
//                         showSizeChanger={false}
//                     />
//                 </>
//             )}
//         </>
//     );
// }
