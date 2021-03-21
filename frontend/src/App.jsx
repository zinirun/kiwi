import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Root from './header/Root';

// 공통
import PostContentPage from './board/common/pages/PostContentPage';

// 학과공지
import NoticePage from './board/notice/pages/NoticePage';

// 커뮤니티
import CommunityPage from './board/community/pages/CommunityPage';

// Q&A
import QuestionPage from './board/question/pages/QuestionPage';

// 재능기부
import TalentPage from './board/talent/pages/TalentPage';

// 장터
import MarketPage from './board/market/pages/MarketPage';

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

function App() {
    return (
        <Router>
            <Root>
                <Switch>
                    <Route exact path="/" component={BoardMainPage} />
                    <Route exact path="/needsign" component={SiteMainPage} />
                    <Route path="/signin" component={SignInPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/notice" component={NoticePage} />
                    <Route path="/community" component={CommunityPage} />
                    <Route path="/question" component={QuestionPage} />
                    <Route path="/talent" component={TalentPage} />
                    <Route path="/market" component={MarketPage} />
                    <Route path="/top" component={TopPage} />
                    <Route path="/post/:id" component={PostContentPage} />
                    <Route path="/modify" component={PostModifyPage} />
                    <Route path="/write" component={PostWritePage} />
                    <Route path="/my/info" component={ChangeUserInfoPage} />
                    <Route path="/my/post" component={MyPostsPage} />
                    <Route path="/my/comment" component={MyCommentsPage} />
                    <Redirect to="/" />
                </Switch>
            </Root>
        </Router>
    );
}

export default App;
