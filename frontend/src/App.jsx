import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Root from './header/Root';

// 게시글
import PostContentPage from './board/common/pages/PostContentPage';

// 게시판 (통합)
import PostListPage from './board/common/pages/PostListPage';

// 검색 (통합)
import SearchPage from './board/common/pages/SearchPage';

// TOP 게시판
import TopPage from './board/top/pages/TopPage';

// 글 수정
import PostModifyPage from './board/common/pages/PostModifyPage';

// 글쓰기
import PostWritePage from './board/common/pages/PostWritePage';

// 로그인
import SignInPage from './common/pages/SignInPage';

// 회원가입
import SignUpPage from './common/pages/SignUpPage';

// 회원 계정 찾기
import FindUserPage from './common/pages/FindUserPage';

// 사이트 메인페이지 (로그인 전)
import SiteMainPage from './common/pages/SiteMainPage';

// 보드 메인페이지 (로그인 후)
import BoardMainPage from './board/common/pages/BoardMainPage';

// 회원정보 수정
import ChangeUserInfoPage from './common/pages/ChangeUserInfoPage';

// 나의 글
import MyPostsPage from './my-menu/pages/MyPostsPage';

// 나의 댓글
import MyCommentsPage from './my-menu/pages/MyCommentsPage';

// 나의 스크랩
import MyScrapPage from './my-menu/pages/MyScrapPage';

// 나의 그룹 (속닥속닥)
import MyGroupPage from './my-menu/pages/MyGroupPage';

// 그룹 컨텐츠 페이지
import GroupContentPage from './my-menu/pages/GroupContentPage';

// 나의 알림
import MyNotificationPage from './my-menu/pages/MyNotificationPage';

// 관리자 페이지
import AdminPage from './admin/pages/AdminPage';

// 신고 페이지
import ReportPage from './common/pages/ReportPage';

// 이메일 인증 페이지
import EmailAuthPage from './common/pages/EmailAuthPage';

// console warning
import consoleMessage from './configs/consoleMessage';

function App() {
    useEffect(() => {
        consoleMessage();
    }, []);

    return (
        <Router>
            <Root>
                <Switch>
                    <Route exact path="/" component={BoardMainPage} />
                    <Route exact path="/needsign" component={SiteMainPage} />
                    <Route path="/signin" component={SignInPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/finduser" component={FindUserPage} />
                    <Route path="/board/:boardName" component={PostListPage} />
                    <Route path="/search/:boardName" component={SearchPage} />
                    <Route path="/top" component={TopPage} />
                    <Route path="/group/:id" component={GroupContentPage} />
                    <Route path="/post/:id" component={PostContentPage} />
                    <Route path="/modify" component={PostModifyPage} />
                    <Route path="/write" component={PostWritePage} />
                    <Route path="/report" component={ReportPage} />
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/my/info" component={ChangeUserInfoPage} />
                    <Route path="/my/post" component={MyPostsPage} />
                    <Route path="/my/comment" component={MyCommentsPage} />
                    <Route path="/my/scrap" component={MyScrapPage} />
                    <Route path="/my/group" component={MyGroupPage} />
                    <Route path="/my/notification" component={MyNotificationPage} />
                    <Route path="/emailauth" component={EmailAuthPage} />
                    <Redirect to="/" />
                </Switch>
            </Root>
        </Router>
    );
}

export default App;
