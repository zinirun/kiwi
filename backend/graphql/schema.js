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
        boardId: Int!
        categoryId: Int!
        authorId: Int!
        title: String!
        content: String!
        isDeleted: Int!
        likeCount: Int!
        dislikeCount: Int!
    }

    type Query {
        getUserInfo: User!
        getPost: Post!
    }
`);
