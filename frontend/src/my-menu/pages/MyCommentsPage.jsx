import React from 'react';
import { useLocation } from 'react-router';
import PageTitle from '../../common/components/PageTitle';
import MyCommentsContainer from '../containers/MyCommentsContainer';
import QueryString from 'query-string';

export default function MyCommentsPage() {
    const { search } = useLocation();
    const { page } = QueryString.parse(search);
    return (
        <>
            <PageTitle title="λμ λκΈ" />
            <MyCommentsContainer key="my-comments" page={+page} />
        </>
    );
}
