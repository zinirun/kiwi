import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        overflow: 'hidden',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    linkContainer: {
        marginTop: theme.spacing(3),
    },
    mainBigText: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#bbb',
    },
    mainLink: {
        fontWeight: 'extra-bold',
        color: theme.palette.primary.main,
    },
    leftContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
        backgroundColor: theme.palette.primary.light,
        backgroundImage: 'url(./assets/dku-image.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    rightContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    mainIcon: {
        fontSize: '1.5rem',
    },
}));
