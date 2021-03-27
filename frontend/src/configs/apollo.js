import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { initialState, mutations } from './cache';

const cache = new InMemoryCache();

cache.writeData({
    data: initialState,
});

export const AplClient = new ApolloClient({
    credentials: 'include',
    cache,
    resolvers: {
        Mutation: mutations,
    },
});
