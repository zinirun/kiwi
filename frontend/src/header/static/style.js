import { makeStyles } from '@material-ui/core/styles';
import { CONTENT_MAX_WIDTH } from '../../configs/variables';

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
    sideDrawerWrapper: {
        color: 'white',
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
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        zIndex: 0,
    },
    drawerIcon: {
        color: 'white',
        minWidth: '35px',
        '& svg': {
            fontSize: '1.15rem',
        },
    },
    drawerText: {
        color: 'white',
        '& span': {
            fontSize: '0.925rem',
        },
    },
    drawerItem: {
        paddingLeft: theme.spacing(3),
        height: '50px',
    },
    sideDivider: {
        backgroundColor: theme.palette.primary.dark,
    },
    menuList: {
        padding: 0,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        maxWidth: CONTENT_MAX_WIDTH,
    },
    userSection: {
        padding: '16px 8px',
    },
    userToolButton: {
        cursor: 'pointer',
        color: 'white',
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    notiBadge: {
        '& .ant-badge-dot': {
            boxShadow: 'none',
        },
    },
    userSectionSmall: {
        fontSize: '0.75rem',
    },
    darkReader: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
}));
