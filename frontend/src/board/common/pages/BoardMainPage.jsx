import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../styles/boardMain.style';
import BoardMainContainer from '../containers/BoardMainContainer';

export default function BoardMainPage() {
    const classes = useStyles();

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
            <Grid container justify="center" className={classes.gridContainer}>
                <Grid item xs={12} sm={6}>
                    <BoardMainContainer />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <BoardMainContainer />
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes.gridContainer}>
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
