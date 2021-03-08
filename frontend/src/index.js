import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import { AplClient as client } from './configs/apollo';

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
