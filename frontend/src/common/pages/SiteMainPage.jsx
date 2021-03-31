import React from 'react';
import { CssBaseline, Grid, Paper } from '@material-ui/core';
import { LogoIcon } from '../components/Logo';
import { Link } from 'react-router-dom';
import { useStyles } from '../static/mainPage.style';
import WelcomeContainer from '../containers/WelcomeContainer';

export default function SiteMainPage() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={8} className={classes.leftContainer} align="center">
                <div className={classes.paper}>
                    <WelcomeContainer />
                </div>
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                md={4}
                component={Paper}
                elevation={8}
                className={classes.rightContainer}
                square
            >
                <div className={classes.paper}>
                    <div>
                        <LogoIcon />
                    </div>
                    <Grid container className={classes.linkContainer} spacing={1} justify="center">
                        <Grid item xs={12} align="center">
                            <span className={classes.mainBigText}>
                                <Link to="/signin" className={classes.mainLink}>
                                    로그인
                                </Link>
                                하고 키위해요!
                            </span>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <span className={classes.mainBigText}>
                                계정이 없으시면{' '}
                                <Link to="/signup" className={classes.mainLink}>
                                    회원가입
                                </Link>
                                하세요!
                            </span>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}
