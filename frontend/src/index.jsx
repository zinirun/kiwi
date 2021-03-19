import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import 'antd/dist/antd.css';

import { theme } from './common/theme/global';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo';
import { AplClient as client } from './configs/apollo';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <ApolloProvider client={client}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </ApolloProvider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
