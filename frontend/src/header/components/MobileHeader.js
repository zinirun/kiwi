import { AppBar, Toolbar, IconButton, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../static/style';
import { MobileLogo } from '../../common/components/Logo';
import NotificationsIcon from '@material-ui/icons/Notifications';

export default function MobileHeader({ mobileOpen, setMobileOpen }) {
    const classes = useStyles();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Grid container justify="center">
                    <Grid item xs>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs align="center">
                        <MobileLogo />
                    </Grid>
                    <Grid item xs align="right">
                        <IconButton
                            color="inherit"
                            className={classes.menuButton}
                            style={{ margin: 0, marginRight: '-12px' }}
                        >
                            <NotificationsIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
