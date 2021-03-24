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
            department
            grade
        }
    }
`;

export const GET_POST_LIST = gql`
    query getPostsByBoardId(
        $boardId: ID!
        $categoryId: ID
        $pageNumber: Int!
        $elementCount: Int!
    ) {
        getPostsByBoardId(
            boardId: $boardId
            categoryId: $categoryId
            pageNumber: $pageNumber
            elementCount: $elementCount
        ) {
            id
            __typename @skip(if: true)
            title
            gradeName
            authorName
            createdAt
            categoryName
            likeCount
            commentCount
        }
    }
`;

export const GET_POSTS_COUNT = gql`
    query getPostsCountByBoardId($boardId: ID!, $categoryId: ID) {
        getPostsCountByBoardId(boardId: $boardId, categoryId: $categoryId)
    }
`;

export const GET_SCRAP_COUNT = gql`
    query getScrapCount {
        getScrapCount
    }
`;

export const GET_TOP_POSTS_COUNT = gql`
    query getPostsCountByLikeCount($likeCount: Int!) {
        getPostsCountByLikeCount(likeCount: $likeCount)
    }
`;

export const GET_MY_POSTS_COUNT = gql`
    query getMyPostsCount {
        getMyPostsCount
    }
`;

export const GET_MY_COMMENTS_COUNT = gql`
    query getMyCommentsCount {
        getMyCommentsCount
    }
`;

export const GET_SEARCH_POSTS_COUNT = gql`
    query getSearchPostsCount($boardId: ID!, $searchValue: String!) {
        getSearchPostsCount(boardId: $boardId, searchValue: $searchValue)
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

export const GET_BOARD_BY_NAME = gql`
    query getBoardByName($boardName: String!) {
        getBoardByName(boardName: $boardName) {
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
            boardLink
            content
            categoryName
            gradeName
            authorName
            createdAt
            likeCount
            commentCount
            files {
                id
                postId
                fileName
                fileType
                fileUrl
            }
        }
    }
`;

export const GET_MY_POSTS = gql`
    query getMyPosts($pageNumber: Int!, $elementCount: Int!) {
        getMyPosts(pageNumber: $pageNumber, elementCount: $elementCount) {
            id
            title
            categoryName
            gradeName
            authorName
            createdAt
            likeCount
            commentCount
        }
    }
`;

export const GET_MY_COMMENTS = gql`
    query getMyComments($pageNumber: Int!, $elementCount: Int!) {
        getMyComments(pageNumber: $pageNumber, elementCount: $elementCount) {
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

export const GET_POSTS_BY_LIKE_COUNT = gql`
    query getPostsByLikeCount($likeCount: Int!, $pageNumber: Int!, $elementCount: Int!) {
        getPostsByLikeCount(
            likeCount: $likeCount
            pageNumber: $pageNumber
            elementCount: $elementCount
        ) {
            id
            __typename @skip(if: true)
            title
            gradeName
            authorName
            createdAt
            categoryName
            likeCount
            commentCount
        }
    }
`;

export const GET_SCRAP = gql`
    query getScrapById($pageNumber: Int!, $elementCount: Int!) {
        getScrapById(pageNumber: $pageNumber, elementCount: $elementCount) {
            id
            title
            gradeName
            authorName
            createdAt
            categoryName
            likeCount
            commentCount
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

export const UPDATE_POST = gql`
    mutation updatePost($id: ID!, $post: PostUpdateInput!) {
        updatePost(id: $id, post: $post)
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

export const SCRAP_POST = gql`
    mutation scrapPost($postId: ID!) {
        scrapPost(postId: $postId)
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

export const DELETE_COMMENT = gql`
    mutation deleteComment($id: ID!) {
        deleteComment(id: $id)
    }
`;

export const SEARCH_POST_LIST = gql`
    query searchPostsByBoardId(
        $boardId: ID!
        $searchValue: String!
        $pageNumber: Int!
        $elementCount: Int!
    ) {
        searchPostsByBoardId(
            boardId: $boardId
            searchValue: $searchValue
            pageNumber: $pageNumber
            elementCount: $elementCount
        ) {
            id
            __typename @skip(if: true)
            title
            gradeName
            authorName
            createdAt
            likeCount
            commentCount
        }
    }
`;

export const GET_MY_MASTER_GROUPS = gql`
    query getMyMasterGroups {
        getMyMasterGroups {
            id
            title
            createdAt
            masterId
            masterName
            masterGradeName
            members {
                memberId
                memberName
                memberGradeName
            }
        }
    }
`;

export const GET_GROUP = gql`
    query getGroup($id: ID!) {
        getGroup(id: $id) {
            id
            title
            userId
            createdAt
            masterId
            masterName
            masterGradeName
            members {
                memberId
                memberName
                memberGradeName
            }
        }
    }
`;

export const GET_MY_GROUPS = gql`
    query getMyGroups {
        getMyGroups {
            id
            title
            userId
            createdAt
            masterId
            masterName
            masterGradeName
            members {
                memberId
                memberName
                memberGradeName
            }
        }
    }
`;

export const GET_GROUP_COMMENTS = gql`
    query getGroupComments($groupId: ID!) {
        getGroupComments(groupId: $groupId) {
            id
            groupId
            userId
            authorId
            authorName
            authorGradeName
            content
            createdAt
        }
    }
`;

export const CREATE_GROUP = gql`
    mutation createGroup($title: String!) {
        createGroup(title: $title) {
            id
            departmentId
            title
            masterId
        }
    }
`;

export const INVITE_GROUP_MEMBER = gql`
    mutation inviteGroupMember($groupId: ID!, $memberId: ID!) {
        inviteGroupMember(groupId: $groupId, memberId: $memberId)
    }
`;

export const QUIT_GROUP_MEMBER = gql`
    mutation quitGroupMember($groupId: ID!, $memberId: ID!) {
        quitGroupMember(groupId: $groupId, memberId: $memberId)
    }
`;

export const SELF_QUIT_GROUP_MEMBER = gql`
    mutation selfQuitGroupMember($groupId: ID!) {
        selfQuitGroupMember(groupId: $groupId)
    }
`;

export const CREATE_GROUP_COMMENT = gql`
    mutation createGroupComment($comment: GroupCommentInput!) {
        createGroupComment(comment: $comment) {
            id
        }
    }
`;

export const DELETE_GROUP = gql`
    mutation deleteGroup($id: ID!) {
        deleteGroup(id: $id)
    }
`;

export const DELETE_GROUP_COMMENT = gql`
    mutation deleteGroupComment($id: ID!) {
        deleteGroupComment(id: $id)
    }
`;

export const GET_MY_NOTIFICATIONS = gql`
    query getMyNotifications {
        getMyNotifications {
            id
            type
            postId
            commentId
            groupId
            count
            updatedAt
        }
    }
`;
