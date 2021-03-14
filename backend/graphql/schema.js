const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Date

    type User {
        id: ID!
        userAccount: String!
        userName: String!
        departmentId: ID!
        studentNumber: String!
        studentGradeId: ID!
        companyId: ID!
        status: Int!
    }

    type Post {
        id: ID!
        boardId: ID!
        categoryId: ID!
        authorId: ID!
        title: String!
        content: String!
        isDeleted: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type PostLike {
        id: ID!
        userId: ID!
        postId: ID!
        isLike: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type Comment {
        id: ID!
        postId: ID!
        userId: ID!
        userName: String!
        content: String!
        isDeleted: Int!
        isAnonymous: Int!
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type Board {
        id: ID!
        boardName: String!
        isAnonymous: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type Category {
        id: ID!
        boardId: ID!
        categoryName: String!
        createdAt: Date!
        updatedAt: Date
    }

    input PostInput {
        boardId: ID!
        categoryId: ID!
        title: String!
        content: String!
    }

    input PostUpdateInput {
        id: ID!
        title: String!
        content: String!
    }

    type Query {
        getUserInfo: User!
        getPostById(id: ID!): Post!
        getCommentsByPostId(postId: ID!): [Comment]!
        getPostLikeById(id: ID!): PostLike!
        getBoardById(id: ID!): Board!
        getCategoryById(id: ID!): Category!
    }

    type Mutation {
        createPost(post: PostInput!): Post
        updatePost(post: PostUpdateInput!): Boolean
        deletePost(id: ID!): Boolean
        handlePostLike(postId: ID!): String
    }
`);
