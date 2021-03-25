import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { initialState, mutations } from './cache';

const cache = new InMemoryCache();

cache.writeData({
    data: initialState,
});

export const AplClient = new ApolloClient({
    link: new createHttpLink({
        uri: '/graphql',
        withCredentials: true,
    }),
    credentials: 'include',
    cache,
    resolvers: {
        Mutation: mutations,
    },
});
