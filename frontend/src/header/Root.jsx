import React, { useEffect } from 'react';
import { CssBaseline, Hidden, Drawer, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import { useStyles } from './static/style';
import SideDrawer from './components/SideDrawer';
import MobileHeader from './components/MobileHeader';
import { useHistory, useLocation } from 'react-router';
import { isFullScreen, isPublic } from './tools/handler';
import { useMutation, useQuery } from 'react-apollo';
import { GET_USER, UPDATE_LOCAL_IS_ADMIN, UPDATE_LOCAL_IS_SPECIAL_TYPE } from '../configs/queries';
import { ADMIN_TYPE, NORMAL_USER_TYPE } from '../configs/variables';

export default function Root(props) {
    const { pathname } = useLocation();
    const history = useHistory();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const [user, setUser] = useState(null);
    const { data, loading, error } = useQuery(GET_USER);
    const [updateLocalIsSpecialType] = useMutation(UPDATE_LOCAL_IS_SPECIAL_TYPE);
    const [updateLocalIsAdmin] = useMutation(UPDATE_LOCAL_IS_ADMIN);

    useEffect(() => {
        if (data) {
            const user = data.getUser;
            setUser(data.getUser);
            if (user.type === ADMIN_TYPE) {
                updateLocalIsAdmin().catch(() => {});
            }
            if (user.type !== NORMAL_USER_TYPE) {
                updateLocalIsSpecialType().catch(() => {});
            }
        }
        if (error) {
            if (!isPublic(pathname)) history.push('/needsign');
        }
    }, [data, error, history, pathname, updateLocalIsAdmin, updateLocalIsSpecialType]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {!loading &&
                (isPublic(pathname) ? (
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
