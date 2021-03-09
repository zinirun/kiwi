import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;
export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    sideDrawer: {
        backgroundColor: 'black',
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
    },
    drawerIcon: {
        color: 'white',
        '& svg': {
            fontSize: '1.05rem',
        },
    },
    drawerText: {
        color: 'white',
        '& span': {
            fontSize: '0.95rem',
        },
    },
    drawerItem: {
        paddingLeft: theme.spacing(3),
    },
    sideDivider: {
        backgroundColor: theme.palette.primary.dark,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
