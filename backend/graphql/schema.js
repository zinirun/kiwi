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

    type Comment {
        id: ID!
        postId: ID!
        authorId: ID!
        content: String!
        isDeleted: Int!
        isAnonymous: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type CommentLike {
        id: ID!
        userId: ID!
        commentId: ID!
        createdAt: Date!
        updatedAt: Date
        isDeleted: Int!
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
    }

    type Mutation {
        createPost(post: PostInput!): Post
        updatePost(post: PostUpdateInput!): Boolean
        deletePost(id: ID!): Boolean
    }
`);
