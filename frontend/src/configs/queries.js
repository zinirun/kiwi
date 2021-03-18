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
        }
    }
`;

export const GET_POST = gql`
    query getPostById($id: ID!) {
        getPostById(id: $id) {
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

export const GET_COMMENTS = gql`
    query getCommentsByPostId($id: ID!) {
        getCommentsByPostId(id: $id) {
            id
            postId
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

export const CREATE_POST = gql`
    mutation createPost($post: PostInput!) {
        createPost(post: $post) {
            id
            boardId
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($user: UserUpdateInput!) {
        updateUser(user: $user)
    }
`;
