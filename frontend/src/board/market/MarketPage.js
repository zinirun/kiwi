import React from 'react';
import Root from '../../header/Root';

import PageTitle from '../../common/components/PageTitle';
import BoardContent from '../common/BoardContent';

export default function CommunityPage() {
    return (
        <Root>
            <PageTitle title="장터" />
            <BoardContent />
        </Root>
    );
}
