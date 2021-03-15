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
    {
        id: 4,
        name: '재능기부',
    },
];

export default function BoardMainPage() {
    return (
        <>
            <Grid container justify="center">
                {BOARD_ID.map((board) => (
                    <Grid key={board.id} item xs={12} sm={6}>
                        <BoardMainContainer board={board} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
