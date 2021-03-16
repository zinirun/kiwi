import React from 'react';
import PageTitle from '../../../common/components/PageTitle';
import BoardListContainer from '../../common/containers/BoardListContainer';

export default function CommunityPage() {
    return (
        <>
            <PageTitle title="재능기부" />
            <BoardListContainer boardId={4} />
        </>
    );
}
