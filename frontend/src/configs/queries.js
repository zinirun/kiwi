import gql from 'graphql-tag';

export const GET_USER = gql`
    query getUser {
        getUser {
            id
            userAccount
            userName
            studentNumber
            department
            grade
            company
        }
    }
`;

export const GET_POST_LIST = gql`
    query getPostsByBoardId($boardId: ID!) {
        getPostsByBoardId(boardId: $boardId) {
            postId
            title
            companyName
            gradeName
            userName
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

export const CREATE_POST = gql`
    mutation createPost($post: PostInput!) {
        createPost(post: $post) {
            id
            boardId
        }
    }
`;
