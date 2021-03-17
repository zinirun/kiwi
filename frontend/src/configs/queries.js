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
            categoryName
        }
    }
`;
