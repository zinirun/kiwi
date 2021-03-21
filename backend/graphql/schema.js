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
        userId: ID!
        authorId: ID!
        boardId: ID!
        boardName: String!
        boardLink: String
        categoryName: String
        title: String!
        content: String!
        companyName: String
        gradeName: String!
        authorName: String!
        createdAt: Date!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
    }

    type RecentPosts {
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
        userId: ID!
        postId: ID!
        authorId: ID!
        authorName: String!
        content: String!
        gradeId: ID!
        gradeName: String!
        companyId: ID
        companyName: String
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }

    type CommentAfterCreate {
        id: ID!
        authorId: ID!
        postId: ID!
        content: String!
        createdAt: Date!
    }

    type Board {
        id: ID!
        boardName: String!
        link: String!
        icon: String
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
        authorName: String!
        updatedAt: Date!
        categoryName: String
        likeCount: Int!
        commentCount: Int!
    }

    type SearchPostList {
        id: ID!
        title: String!
        companyName: String
        gradeName: String!
        authorName: String!
        updatedAt: Date!
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
        content: String!
    }

    type Query {
        getUser: User!
        getPostById(id: ID!): Post!
        getPostsByBoardId(boardId: ID!, categoryId: ID, pageNumber: Int!, elementCount: Int!): [PostList]
        getPostsByLikeCount(likeCount: Int!): [PostList]
        getPostsByLikeCountWithDay(term: Int!): [PostList]
        getRecentPosts: [RecentPosts]
        getCommentsByPostId(id: ID!): [Comment]
        getBoardById(id: ID!): Board!
        getBoards: [Board]
        getCategoryById(id: ID!): Category!
        getCategoriesByBoardId(boardId: ID!): [CategoryList]
        getMyPosts(pageNumber: Int!, elementCount: Int!): [PostList]
        getMyComments: [Comment]
        searchPostsByBoardId(boardId: ID!, searchValue: String!): [SearchPostList]
    }

    type Mutation {
        updateUser(user: UserUpdateInput!): Boolean
        updateUserStatus(status: Int!): Boolean
        updateUserPassword(currentPassword: String!, newPassword: String!): Boolean
        createPost(post: PostInput!): PostAfterCreate
        updatePost(id: ID!, post: PostUpdateInput!): Boolean
        deletePost(id: ID!): Boolean
        handlePostLike(postId: ID!): String
        createComment(comment: CommentInput!): CommentAfterCreate
        deleteComment(id: ID!): Boolean
        handleCommentLike(commentId: ID!): String
        searchPostsByBoardId(boardId: ID!, searchValue: String!): [SearchPostList]
    }
`);
