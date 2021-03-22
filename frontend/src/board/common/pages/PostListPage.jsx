import { useQuery } from '@apollo/react-hooks';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import PageTitle from '../../../common/components/PageTitle';
import { GET_BOARD_BY_NAME } from '../../../configs/queries';
import PostListContainer from '../../common/containers/PostListContainer';
import QueryString from 'query-string';

export default function PostListPage({ match }) {
    const { boardName } = match.params;
    const { search } = useLocation();
    const { page } = QueryString.parse(search);
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
                    <PostListContainer board={board} page={+page} />
                </>
            )}
        </>
    );
}
