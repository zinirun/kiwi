import React from 'react';
import { Grid } from '@material-ui/core';
import BoardMainContainer from '../containers/BoardMainContainer';

const BOARD_ID = [
    {
        id: 1,
        name: '학과 공지',
    },
    {
        id: 2,
        name: '커뮤니티',
    },
    {
        id: 3,
        name: 'Q&A',
    },
];

export default function BoardMainPage() {
    return (
        <>
            <Grid container justify="center">
                {BOARD_ID.map((board) => (
                    <Grid item xs={12} sm={6}>
                        <BoardMainContainer boardId={board.id} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
