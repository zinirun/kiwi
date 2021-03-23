import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Root from './header/Root';

// 공통
import PostContentPage from './board/common/pages/PostContentPage';

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

// 게시판 (통합)
import PostListPage from './board/common/pages/PostListPage';

// 검색 (통합)
import SearchPage from './board/common/pages/SearchPage';

// 메시지 (속닥속닥)
import MessagePage from './my-menu/pages/MessagePage';

function App() {
    return (
        <Router>
            <Root>
                <Switch>
                    <Route exact path="/" component={BoardMainPage} />
                    <Route exact path="/needsign" component={SiteMainPage} />
                    <Route path="/signin" component={SignInPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/board/:boardName" component={PostListPage} />
                    <Route path="/search/:boardName" component={SearchPage} />
                    <Route path="/top" component={TopPage} />
                    <Route path="/post/:id" component={PostContentPage} />
                    <Route path="/modify" component={PostModifyPage} />
                    <Route path="/write" component={PostWritePage} />
                    <Route path="/my/info" component={ChangeUserInfoPage} />
                    <Route path="/my/post" component={MyPostsPage} />
                    <Route path="/my/comment" component={MyCommentsPage} />
                    <Route path="/my/scrap" component={MyScrapPage} />
                    <Route path="/message" component={MessagePage} />
                    <Redirect to="/" />
                </Switch>
            </Root>
        </Router>
    );
}

export default App;
