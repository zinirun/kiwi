import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #ddd',
        boxShadow: 'none',
        marginBottom: 15,
    },
    part: {
        background: theme.palette.primary.main,
        width: 70,
        padding: '2px 6px',
        fontSize: 12,
        color: 'white',
        borderRadius: '10px',
        marginRight: 5,
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        borderBottom: '1px solid #ddd',
        color: '#444',
    },
    deleteIcon: {
        fontSize: '1.2rem',
        color: '#ccc',
        cursor: 'pointer',
        '&:hover': {
            color: '#F86A6A',
        },
    },
    upIcon: {
        width: 18,
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    commentIcon: {
        width: 18,
        marginLeft: 15,
        color: theme.palette.primary.main,
    },
    date: {
        fontSize: 12,
        color: '#BBBBBB',
    },
    postChip: {
        marginBottom: 10,
        marginLeft: 5,
        background: 'transparent',
    },
    commentChip: {
        marginTop: 10,
        background: 'transparent',
    },
    userInfoSection: {
        paddingBottom: 30,
    },
    modifyIcon: {
        fontSize: '1.2rem',
        color: '#ccc',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    contentLine: {
        margin: '3px 0',
    },
    attachWrapper: {
        marginTop: 20,
    },
    imageWrapper: {
        marginBottom: 10,
    },
    normalFileWrapper: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
}));
