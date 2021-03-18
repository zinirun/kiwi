import React from 'react';
import PageTitle from '../../common/components/PageTitle';
import MyCommentsContainer from '../containers/MyCommentsContainer';

export default function MyCommentsPage() {
    return (
        <>
            <PageTitle title="나의 댓글" />
            <MyCommentsContainer />
        </>
    );
}
