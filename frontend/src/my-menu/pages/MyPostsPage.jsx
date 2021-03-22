import React from 'react';
import PageTitle from '../../common/components/PageTitle';
import MyPostsContainer from '../containers/MyPostsContainer';
import QueryString from 'query-string';
import { useLocation } from 'react-router';

export default function MyPostsPage() {
    const { search } = useLocation();
    const { page } = QueryString.parse(search);
    return (
        <>
            <PageTitle title="나의 글" />
            <MyPostsContainer key="my-posts" page={+page} />
        </>
    );
}
