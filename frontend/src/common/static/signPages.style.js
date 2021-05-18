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
    mainBigText: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
        color: '#bbb',
    },
    mainLink: {
        fontWeight: 'extra-bold',
        color: theme.palette.primary.main,
    },
    changeFormItem: {
        marginBottom: 10,
    },
    changeItemWrapper: {
        marginTop: 15,
    },
    button: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.925rem',
        height: 32,
        padding: '0 14px',
        borderRadius: 30,
        background: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: 'white',
        },
    },
    authFormWrapper: {
        marginTop: 10,
    },
    uploader: {
        '& .ant-upload': {
            width: '100%',
            height: 300,
        },
    },
    authInfo: {
        padding: 10,
        color: '#999',
    },
    authInfoSmall: {
        padding: 10,
        color: '#999',
        marginBottom: 0,
    },
    typeWrapper: {
        marginBottom: 0,
    },
    exampleWrapper: {
        marginTop: -10,
        marginBottom: 15,
        backgroundColor: '#fafafa',
        border: '1px solid #ddd',
        borderRadius: 5,
        padding: 10,
    },
    backLinkWrapper: {
        marginTop: 10,
    },
    backLink: {
        color: '#999',
    },
    foundWrapper: {
        padding: 10,
        fontSize: '1.0rem',
    },
    foundText: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        marginRight: 3,
    },
    signInfo: {
        fontSize: '1.1rem',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    authText: {
        fontSize: '1rem',
        margin: 0,
    },
    authIcon: {
        fontSize: '2rem',
        color: theme.palette.primary.main,
    },
    authRedIcon: {
        fontSize: '2rem',
        color: theme.palette.secondary.main,
    },
}));
