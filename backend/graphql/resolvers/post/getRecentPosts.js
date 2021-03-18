/**
 * 게시판별 최근 게시물 5개 Read
 * @author 이건욱
 * @param
 * @returns {[RecentPosts]}
 * type RecentPosts {
         boardId: ID!
         boardName: String! 
         posts: [RecentPost]
    }

    type RecentPost {
        postId: ID!
        title: String!
        likeCount: Int
    }
* getRecentPosts: [RecentPosts]
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({}, {}) => {
    const query = `
                    select b.id as boardId, b.boardName, s.id as postId, s.title, ifnull(ppl.likeCount, 0) as likeCount
                    from (select id, boardId, title, ROW_NUMBER() OVER (PARTITION BY boardId ORDER BY id desc) as rn from post) as s
                        join board b on b.id = s.boardId
                        left join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted = 0) as ppl on s.id = ppl.postId
                    where s.rn <= 5
                    order by s.boardId;
                    `;
    return await models.sequelize.query(query).spread(
        (result) => {
            let recentPosts = [];
            const pureData = JSON.parse(JSON.stringify(result));
            pureData.forEach((d) => {
                const arrayIndex = d.boardId - 1;
                if (recentPosts[arrayIndex]) {
                    recentPosts[arrayIndex].posts.push({
                        postId: d.postId,
                        title: d.title,
                        likeCount: d.likeCount,
                    });
                } else {
                    recentPosts[arrayIndex] = {
                        boardId: d.boardId,
                        boardName: d.boardName,
                        posts: [
                            {
                                postId: d.postId,
                                title: d.title,
                                likeCount: d.likeCount,
                            },
                        ],
                    };
                }
            });
            console.log(recentPosts);
            return recentPosts;
        },
        () => NotFoundError('There is no post corresponding to the id'),
    );
};
