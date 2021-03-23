import GroupCommentContainer from '../containers/GroupCommentContainer';
import GroupInfoContainer from '../containers/GroupInfoContainer';

export default function GroupContentPage({ match }) {
    const { id } = match.params;
    return (
        <>
            <GroupInfoContainer id={id} />
            <GroupCommentContainer id={id} />
        </>
    );
}
