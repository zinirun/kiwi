import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// temp
import TempPage from './TempPage';

// 공통
import PostPage from './board/common/PostPage';

// 학과공지
import NoticePage from './board/notice/NoticePage';

// 커뮤니티
import CommunityPage from './board/community/CommunityPage';

// Q&A
import QuestionPage from './board/question/QuestionPage';

// 재능기부
import TalentPage from './board/talent/TalentPage';

// 장터
import MarketPage from './board/market/MarketPage';

// 나의 글

// 나의 댓글

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={TempPage} />
                <Route path="/notice" component={NoticePage} />
                <Route path="/community" component={CommunityPage} />
                <Route path="/question" component={QuestionPage} />
                <Route path="/talent" component={TalentPage} />
                <Route path="/market" component={MarketPage} />
                <Route path="/post" component={PostPage} />
            </Switch>
        </Router>
    );
}

export default App;
