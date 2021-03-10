import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route } from 'react-router';

import { theme } from './common/theme/global';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo';
import { AplClient as client } from './configs/apollo';

// 학과공지

// 커뮤니티

// Q&A

// 재능기부

// 장터

// 나의 글

// 나의 댓글

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
