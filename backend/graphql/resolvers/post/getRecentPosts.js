/**
 * 게시판별 최근 게시물 5개 Read
 * @author 이건욱
 * @param
 * @returns {[RecentPosts]}
 * type RecentPosts {
         boardId: ID!
         boardName: String!
         boardLink: String!
         boardIcon: String!
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
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, {}) => {
    const query = `
                    select b.id as boardId,
                        b.boardName,
                        b.link as boardLink,
                        b.icon as boardIcon,
                        s.id,
                        s.title,
                        ifnull(ppl.likeCount, 0) as likeCount
                    from (select id, boardId, title, ROW_NUMBER() OVER (PARTITION BY boardId ORDER BY id desc) as rn from post where isDeleted = 0 order by rn desc) as s
                        join board b on b.id = s.boardId
                        left join (select pl.id, count(pl.id) as likeCount, postId from post_like pl where pl.isDeleted = 0 group by pl.postId) as ppl
                        on s.id = ppl.postId
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
                        id: d.id,
                        title: d.title,
                        likeCount: d.likeCount,
                    });
                } else {
                    recentPosts[arrayIndex] = {
                        boardId: d.boardId,
                        boardName: d.boardName,
                        boardLink: d.boardLink,
                        boardIcon: d.boardIcon,
                        posts: [
                            {
                                id: d.id,
                                title: d.title,
                                likeCount: d.likeCount,
                            },
                        ],
                    };
                }
            });
            return recentPosts.filter((p) => p !== null);
        },
        () => ConflictError('Database error'),
    );
};
