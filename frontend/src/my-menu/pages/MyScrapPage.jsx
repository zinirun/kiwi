import React from 'react';
import PageTitle from '../../common/components/PageTitle';
import MyScrapContainer from '../containers/MyScrapContainer';
import QueryString from 'query-string';
import { useLocation } from 'react-router';

export default function MyScrapPage() {
    const { search } = useLocation();
    const { page } = QueryString.parse(search);
    return (
        <>
            <PageTitle title="나의 스크랩" />
            <MyScrapContainer key="my-scrap" page={+page} />
        </>
    );
}
