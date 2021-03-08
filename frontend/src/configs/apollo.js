import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

export const AplClient = new ApolloClient({
    link: new createHttpLink({
        uri: '/graphql',
        withCredentials: true,
    }),
    credentials: 'include',
    cache: new InMemoryCache(),
});
