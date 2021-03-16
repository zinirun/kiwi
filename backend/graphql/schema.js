const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Date

    type User {
        id: ID!
        userAccount: String!
        userName: String!
        studentNumber: String!
        department: String
        grade: String
        company: String
    }

    type Post {
        id: ID!
        authorId: ID!
        authorName: String!
        title: String!
        content: String!
        grade: String
        company: String
        likeCount: Int!
    }

    type PostAfterCreate {
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
        authorId: ID!
        userName: String!
        content: String!
        gradeName: String!
        companyName: String
        isDeleted: Int!
        isAnonymous: Int!
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type CommentAfterCreate {
        id: ID!
        authorId: ID!
        postId: ID!
        content: String!
        isAnonymous: Int!
        createdAt: Date!
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

    input UserUpdateInput {
        id: ID!
        password: String!
        deparmentId: ID!
        studentGradeId: ID!
        companyId: ID
        updatedAt: Date!
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

    input CommentInput {
        postId: ID!
        isAnonymous: Int
        content: String!
    }

    type Query {
        getUser: User!
        getPostById(id: ID!): Post!
        getCommentsByPostId(postId: ID!): [Comment]!
        getBoardById(id: ID!): Board!
        getCategoryById(id: ID!): Category!
    }

    type Mutation {
        createPost(post: PostInput!): PostAfterCreate
        updatePost(post: PostUpdateInput!): Boolean
        deletePost(id: ID!): Boolean
        handlePostLike(postId: ID!): String
        createComment(comment: CommentInput!): CommentAfterCreate
        updateUser(user: UserUpdateInput!): Boolean
        deleteUser(id: ID!): Boolean
    }
`);
