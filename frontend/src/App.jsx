import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Root from './header/Root';

// temp
import TempPage from './TempPage';

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

// 글쓰기
import PostWritePage from './board/common/pages/PostWritePage';

// 로그인
import SignInPage from './common/pages/SignInPage';

// 회원가입
import SignUpPage from './common/pages/SignUpPage';

// 나의 글

// 나의 댓글

function App() {
    return (
        <Router>
            <Root>
                <Switch>
                    <Route exact path="/" component={TempPage} />
                    <Route path="/signin" component={SignInPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/notice" component={NoticePage} />
                    <Route path="/community" component={CommunityPage} />
                    <Route path="/question" component={QuestionPage} />
                    <Route path="/talent" component={TalentPage} />
                    <Route path="/market" component={MarketPage} />
                    <Route path="/post" component={PostContentPage} />
                    <Route path="/write" component={PostWritePage} />
                </Switch>
            </Root>
        </Router>
    );
}

export default App;
