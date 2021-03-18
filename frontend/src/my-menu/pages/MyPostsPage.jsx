import React from 'react';
import PageTitle from '../../common/components/PageTitle';
import MyPostsContainer from '../containers/MyPostsContainer';

export default function MyPostsPage() {
    return (
        <>
            <PageTitle title="나의 글" />
            <MyPostsContainer />
        </>
    );
}
