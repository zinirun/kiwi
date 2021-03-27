/**
 * (관리자)게시물 Read
 * @author 이건욱 
 * @param (postId: String!)
 * @returns {PostAdmin}
 * type PostAdmin {
        id: ID!
        userId: ID!
        department: String!
        authorId: ID!
        boardId: ID!
        boardName: String!
        boardLink: String
        categoryName: String
        title: String!
        content: String!
        isDeleted: Int!
        gradeName: String!
        authorName: String!
        createdAt: Date!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
        files: [File]
    }
* getPostByAdmin(postId: String!): PostAdmin!
 */

const isAdmin = require('../../../middlewares/isAdmin');
const models = require('../../../../models');
const { NotFoundError, ConflictError } = require('../../../errors/errors');

module.exports = async ({ postId }, { id: userId }) => {
    await isAdmin(userId);
    const query = `
                    select p.id,
                        b.id as boardId,
                        p.authorId,
                        b.boardName,
                        b.link as boardLink,
                        p.title,
                        p.content,
                        p.isDeleted,
                        d.deptName as department,
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
                        left join (select count(*) as commentCount, postId from comment c where c.isDeleted = 0 and c.postId = :postId group by postId) as pc
                        on p.id = pc.postId
                        left join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted = 0 and pl.postId = :postId group by postId) as ppl
                        on p.id = ppl.postId,
                        user u
                        left join grade g on u.studentGradeId = g.id
                        left join department d on u.departmentId = d.id
                    where p.authorId = u.id
                    and p.id = :postId;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                postId,
            },
        })
        .spread(
            async (result) => {
                if (result[0]) {
                    const post = JSON.parse(JSON.stringify(result[0]));
                    const files = await models.file.findAll({
                        attributes: ['id', 'postId', 'fileName', 'fileType', 'fileUrl'],
                        where: { postId },
                        raw: true,
                    });
                    if (files) {
                        post.files = files;
                    }
                    post.userId = userId;
                    console.log(post);
                    return post;
                } else {
                    throw NotFoundError('Post Not Exist');
                }
            },
            () => ConflictError('Database error'),
        );
};