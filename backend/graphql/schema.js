const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Date

    type User {
        id: ID!
        userAccount: String!
        userName: String!
        studentNumber: String!
        studentGradeId: ID!
        departmentId: ID!
        companyId: ID
        department: String
        grade: String
        company: String
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        companyName: String
        gradeName: String!
        authorName: String!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
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
        createdAt: Date!
        updatedAt: Date
    }

    type Category {
        categoryId: ID!
        boardId: ID!
        categoryName: String!
        createdAt: Date!
        updatedAt: Date
    }

    type CategoryList {
        categoryId: ID!
        boardId: ID!
        categoryName: String!
        boardName: String!
        createdAt: Date!
        updatedAt: Date
    }

    type PostList {
        id: ID!
        title: String!
        companyName: String
        gradeName: String!
        userName: String!
        updatedAt: Date!
        categoryName: String
        likeCount: Int!
        commentCount: Int!
    }

    input UserUpdateInput {
        studentGradeId: ID!
        companyId: ID
    }

    input PostInput {
        boardId: ID!
        categoryId: ID
        title: String!
        content: String!
    }

    input PostUpdateInput {
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
        getPostsByBoardId(boardId: ID!, categoryId: ID): [PostList]!
        getCategoriesByBoardId(boardId: ID!): [CategoryList]!
    }

    type Mutation {
        updateUser(user: UserUpdateInput!): Boolean
        updateUserStatus(status: Int!): Boolean
        createPost(post: PostInput!): PostAfterCreate
        updatePost(post: PostUpdateInput!): Boolean
        deletePost(id: ID!): Boolean
        handlePostLike(postId: ID!): String
        createComment(comment: CommentInput!): CommentAfterCreate
    }
`);
