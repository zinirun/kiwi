import gql from 'graphql-tag';

export const GET_LOCAL_UNREAD_COUNT = gql`
    query getLocalUnreadCount {
        unreadCount @client
    }
`;

export const UPDATE_LOCAL_UNREAD_COUNT = gql`
    mutation updateLocalUnreadCount($count: Int!) {
        updateLocalUnreadCount(count: $count) @client
    }
`;

export const GET_LOCAL_IS_ADMIN = gql`
    query getLocalIsAdmin {
        isAdmin @client
    }
`;

export const UPDATE_LOCAL_IS_ADMIN = gql`
    mutation updateLocalIsAdmin {
        updateLocalIsAdmin @client
    }
`;

export const GET_LOCAL_IS_SPECIAL_TYPE = gql`
    query getLocalIsSpecialType {
        isSpecialType @client
    }
`;

export const UPDATE_LOCAL_IS_SPECIAL_TYPE = gql`
    mutation updateLocalIsSpecialType {
        updateLocalIsSpecialType @client
    }
`;

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
            type
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
            isSpecial
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
            isSpecial
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
            isSpecial
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
                id
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

export const GET_BEST_POSTS = gql`
    query getPostsByLikeCountWithDay($term: Int!) {
        getPostsByLikeCountWithDay(term: $term) {
            id
            title
            likeCount
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
            title
            titleLength
            count
            updatedAt
        }
    }
`;

export const GET_NOTIFICATIONS_COUNT = gql`
    query getNotificationsCount {
        getNotificationsCount
    }
`;

export const SEEN_NOTIFICATION = gql`
    mutation seenNotification($id: ID!) {
        seenNotification(id: $id)
    }
`;

export const SEEN_ALL_NOTIFICATIONS = gql`
    mutation seenAllNotifications {
        seenAllNotifications
    }
`;

export const CREATE_REPORT = gql`
    mutation createReport($report: ReportInput!) {
        createReport(report: $report)
    }
`;

export const SEARCH_USER_BY_USER_ID = gql`
    mutation searchUserByUserId($id: ID!) {
        searchUserByUserId(id: $id) {
            id
            userAccount
            userName
            studentNumber
            studentGradeId
            grade
            email
            department
            status
            type
        }
    }
`;

export const GET_REPORTS = gql`
    query getReports($isCompleted: Int!) {
        getReports(isCompleted: $isCompleted) {
            id
            userId
            userName
            deptName
            content
            isCompleted
            createdAt
        }
    }
`;

export const SEARCH_USER_BY_STUDENT_NUMBER = gql`
    mutation searchUserByStudentNumber($studentNumber: String!) {
        searchUserByStudentNumber(studentNumber: $studentNumber) {
            id
            userAccount
            userName
            studentNumber
            studentGradeId
            grade
            email
            department
            status
            type
        }
    }
`;

export const COMPLETE_REPORT = gql`
    mutation completeReport($id: ID!) {
        completeReport(id: $id)
    }
`;

export const GET_ALL_DEPARTMENTS = gql`
    query getAllDepartments {
        getAllDepartments {
            id
            deptName
            createdAt
        }
    }
`;

export const CREATE_DEPARTMENT = gql`
    mutation createDepartment($deptName: String!) {
        createDepartment(deptName: $deptName)
    }
`;

export const GET_ALL_BOARDS = gql`
    query getAllBoards {
        getAllBoards {
            id
            boardName
            link
            icon
            isSpecial
            createdAt
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation createBoard($board: BoardInput!) {
        createBoard(board: $board)
    }
`;

export const GET_ALL_CATEGORIES = gql`
    query getAllCategories {
        getAllCategories {
            categoryId
            categoryName
            boardId
            createdAt
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation createCategory($category: CategoryInput!) {
        createCategory(category: $category)
    }
`;

export const UPDATE_STATUS = gql`
    mutation udpateStatus($status: String!, $id: ID!, $reason: String!) {
        updateStatus(status: $status, id: $id, reason: $reason)
    }
`;

export const UPDATE_TYPE = gql`
    mutation updateType($id: ID!, $type: String!) {
        updateType(id: $id, type: $type)
    }
`;

export const SEARCH_POST_BY_ADMIN = gql`
    mutation getPostByAdmin($postId: ID!) {
        getPostByAdmin(postId: $postId) {
            id
            userId
            department
            authorId
            title
            isDeleted
            gradeName
            authorName
            createdAt
            files {
                id
                postId
                fileName
                fileType
                fileUrl
            }
            comments {
                id
                authorId
                content
                isDeleted
                createdAt
                authorName
            }
        }
    }
`;

export const GET_ADMIN_LOGS = gql`
    query getAdminLogs {
        getAdminLogs {
            id
            userId
            log
            createdAt
        }
    }
`;

export const DELETE_COMMENT_BY_ADMIN = gql`
    mutation deleteCommentByAdmin($id: ID!, $postId: ID!, $reason: String!) {
        deleteCommentByAdmin(id: $id, postId: $postId, reason: $reason)
    }
`;

export const DELETE_POST_BY_ADMIN = gql`
    mutation deletePost($id: ID!, $reason: String!) {
        deletePost(id: $id, reason: $reason)
    }
`;
