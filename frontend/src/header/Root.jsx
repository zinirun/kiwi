import React from 'react';
import { CssBaseline, Hidden, Drawer, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import { useStyles } from './static/style';
import SideDrawer from './components/SideDrawer';
import MobileHeader from './components/MobileHeader';
import { useLocation } from 'react-router';

const isWithoutSider = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
        case 'signin':
        case 'signup':
        case 'needuser':
        case 'finduser':
            return true;
        default:
            return false;
    }
};

const isFullScreen = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
        case 'needuser':
        case 'finduser':
            return true;
        default:
            return false;
    }
};

export default function Root(props) {
    const { pathname } = useLocation();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {isWithoutSider(pathname) ? (
                isFullScreen(pathname) ? (
                    <>{props.children}</>
                ) : (
                    <Container maxWidth="sm">{props.children}</Container>
                )
            ) : (
                <div className={classes.root}>
                    <CssBaseline />
                    <Hidden smUp implementation="css">
                        <MobileHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
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
                                <SideDrawer />
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
                                <SideDrawer />
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
            )}
        </>
    );
}
