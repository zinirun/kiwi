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
            <PageTitle title="나의 댓글" />
            <MyCommentsContainer page={+page} />
        </>
    );
}
