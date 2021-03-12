import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    loginTitle: {
        fontSize: '1.35rem',
        fontWeight: 'bold',
        color: '#ccc',
    },
    loginTitleGreen: {
        color: theme.palette.primary.main,
    },
    loginFormContainer: {
        marginTop: theme.spacing(5),
    },
    loginBt: {
        color: 'white',
    },
}));
