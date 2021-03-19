import gql from 'graphql-tag';

export const GET_USER = gql`
    query getUser {
        getUser {
            id
            userAccount
            userName
            studentNumber
            studentGradeId
            departmentId
            companyId
            department
            grade
            company
        }
    }
`;

export const GET_POST_LIST = gql`
    query getPostsByBoardId($boardId: ID!, $categoryId: ID) {
        getPostsByBoardId(boardId: $boardId, categoryId: $categoryId) {
            id
            __typename @skip(if: true)
            title
            companyName
            gradeName
            authorName
            updatedAt
            categoryName
            likeCount
            commentCount
        }
    }
`;

export const GET_CATEGORIES = gql`
    query getCategoriesByBoardId($boardId: ID!) {
        getCategoriesByBoardId(boardId: $boardId) {
            categoryId
            boardId
            boardName
            categoryName
        }
    }
`;

export const GET_BOARD = gql`
    query getBoardById($id: ID!) {
        getBoardById(id: $id) {
            id
            boardName
            link
            icon
        }
    }
`;

export const GET_BOARDS = gql`
    query getBoards {
        getBoards {
            id
            boardName
            link
            icon
        }
    }
`;

export const GET_POST = gql`
    query getPostById($id: ID!) {
        getPostById(id: $id) {
            id
            title
            userId
            boardId
            authorId
            boardName
            content
            companyName
            categoryName
            gradeName
            authorName
            updatedAt
            likeCount
            commentCount
        }
    }
`;

export const GET_MY_POSTS = gql`
    query getMyPosts {
        getMyPosts {
            id
            title
            content
            companyName
            categoryName
            gradeName
            authorName
            updatedAt
            likeCount
            commentCount
        }
    }
`;

export const GET_MY_COMMENTS = gql`
    query getMyComments {
        getMyComments {
            id
            postId
            authorId
            authorName
            content
            likeCount
            createdAt
        }
    }
`;

export const GET_COMMENTS = gql`
    query getCommentsByPostId($id: ID!) {
        getCommentsByPostId(id: $id) {
            id
            postId
            userId
            authorId
            authorName
            content
            gradeId
            gradeName
            companyId
            companyName
            likeCount
            createdAt
        }
    }
`;

export const GET_RECENT_POSTS = gql`
    query getRecentPosts {
        getRecentPosts {
            boardId
            boardLink
            boardIcon
            boardName
            posts {
                postId
                title
                likeCount
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($post: PostInput!) {
        createPost(post: $post) {
            id
            boardId
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
            id
            postId
        }
    }
`;

export const HANDLE_POST_LIKE = gql`
    mutation handlePostLike($postId: ID!) {
        handlePostLike(postId: $postId)
    }
`;

export const HANDLE_COMMENT_LIKE = gql`
    mutation handlePostLike($commentId: ID!) {
        handleCommentLike(commentId: $commentId)
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($user: UserUpdateInput!) {
        updateUser(user: $user)
    }
`;

export const UPDATE_USER_PASSWORD = gql`
    mutation updateUserPassword($currentPassword: String!, $newPassword: String!) {
        updateUserPassword(currentPassword: $currentPassword, newPassword: $newPassword)
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id)
    }
`;
