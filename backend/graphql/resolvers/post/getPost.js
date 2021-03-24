/**
 * 게시물 Read
 * @author 이건욱 modified by zini
 * @param (id: ID!)
 * @returns {Post}
 * type Post {
        id: ID!
        userId: ID!
        authorId: ID!
        boardId: ID!
        boardName: String!
        boardLink: String!
        categoryName: String
        title: String!
        content: String!
        gradeName: String!
        authorName: String!
        createdAt: Date!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
        files: [File]
    }
    type File {
        id: ID!
        postId: ID!
        fileName: String!
        fileUrl: String!
    }
* getPostById(id: ID!): Post!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, { departmentId, id: userId }) => {
    const query = `
                    select p.id,
                        b.id as boardId,
                        p.authorId,
                        b.boardName,
                        b.link as boardLink,
                        p.title, p.content,
                        g.gradeName,
                        u.userName as authorName,
                        p.createdAt,
                        p.updatedAt,
                        cg.categoryName,
                        ifnull(ppl.likeCount, 0) as likeCount,
                        ifnull(pc.commentCount, 0) as commentCount
                    from post p
                        left join category cg on p.categoryId = cg.id
                        left join board b on b.id = p.boardId
                        left join (select count(*) as commentCount, postId from comment c where c.isDeleted = 0 and c.postId = :id group by postId) as pc
                        on p.id = pc.postId
                        left join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted = 0 and pl.postId = :id group by postId) as ppl
                        on p.id = ppl.postId,
                        user u
                        left join grade g on u.studentGradeId = g.id
                    where p.authorId = u.id
                    and p.isDeleted = 0
                    and p.id=:id
                    and p.departmentId=:departmentId;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
                departmentId,
            },
        })
        .spread(
            async (result) => {
                if (result[0]) {
                    const post = JSON.parse(JSON.stringify(result[0]));
                    const files = await models.file.findAll({
                        attributes: ['id', 'postId', 'fileName', 'fileType', 'fileUrl'],
                        where: { postId: id },
                        raw: true,
                    });
                    if (files) {
                        post.files = files;
                    }
                    post.userId = userId;
                    return post;
                } else {
                    throw NotFoundError('Post Not Exist');
                }
            },
            () => ConflictError('Database error'),
        );
};
