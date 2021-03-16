import React, { useEffect } from 'react';
import { CssBaseline, Hidden, Drawer, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import { useStyles } from './static/style';
import SideDrawer from './components/SideDrawer';
import MobileHeader from './components/MobileHeader';
import { useHistory, useLocation } from 'react-router';
import { isFullScreen, isWithoutSider } from './tools/handler';
import { useQuery } from 'react-apollo';
import { GET_USER } from '../configs/queries';

export default function Root(props) {
    const { pathname } = useLocation();
    const history = useHistory();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const [user, setUser] = useState(null);
    const { data, loading, error } = useQuery(GET_USER);

    useEffect(() => {
        if (data) {
            setUser(data.getUser);
        }
        if (error) {
            history.push('/needsign');
        }
    }, [data, error, history]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {!loading &&
                (isWithoutSider(pathname) ? (
                    isFullScreen(pathname) ? (
                        <>{props.children}</>
                    ) : (
                        <Container maxWidth="sm">{props.children}</Container>
                    )
                ) : (
                    user && (
                        <div className={classes.root}>
                            <CssBaseline />
                            <Hidden smUp implementation="css">
                                <MobileHeader
                                    mobileOpen={mobileOpen}
                                    setMobileOpen={setMobileOpen}
                                />
                            </Hidden>
                            <nav className={classes.drawer} aria-label="menu">
                                <Hidden smUp implementation="css">
                                    <Drawer
                                        container={container}
                                        variant="temporary"
                                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                        open={mobileOpen}
                                        onClose={handleDrawerToggle}
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        ModalProps={{
                                            keepMounted: true,
                                        }}
                                    >
                                        <SideDrawer user={user} />
                                    </Drawer>
                                </Hidden>
                                <Hidden xsDown implementation="css">
                                    <Drawer
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        variant="permanent"
                                        open
                                    >
                                        <SideDrawer user={user} />
                                    </Drawer>
                                </Hidden>
                            </nav>
                            <main className={classes.content}>
                                <Hidden smUp implementation="css">
                                    <div className={classes.toolbar} />
                                </Hidden>
                                {props.children}
                            </main>
                        </div>
                    )
                ))}
        </>
    );
}
