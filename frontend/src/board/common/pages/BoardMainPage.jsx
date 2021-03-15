import React from 'react';
import { Grid } from '@material-ui/core';
import BoardMainContainer from '../containers/BoardMainContainer';

export default function BoardMainPage() {
    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    <BoardMainContainer />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <BoardMainContainer />
                </Grid>
            </Grid>
        </>
    );
}
