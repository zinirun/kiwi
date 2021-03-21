import { useQuery } from '@apollo/react-hooks';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PageTitle from '../../../common/components/PageTitle';
import { GET_BOARD_BY_NAME } from '../../../configs/queries';
import BoardListContainer from '../../common/containers/BoardListContainer';

export default function PostListPage({ match }) {
    const { boardName } = match.params;
    const history = useHistory();
    const [board, setBoard] = useState(null);
    const { data, error } = useQuery(GET_BOARD_BY_NAME, {
        variables: {
            boardName,
        },
    });
    useEffect(() => {
        if (data) {
            setBoard(data.getBoardByName);
        }
        if (error) {
            message.error('존재하지 않는 게시판입니다.');
            history.push('/');
        }
    }, [data, error, history]);
    return (
        <>
            {board && (
                <>
                    <PageTitle title={board.boardName} />
                    <BoardListContainer boardId={board.id} />
                </>
            )}
        </>
    );
}
