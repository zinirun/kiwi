import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    notiActionWrapper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginBottom: 15,
    },
    notificationWrapper: {
        marginBottom: 8,
        backgroundColor: 'white',
        padding: 10,
        border: '1px solid #ddd',
        borderRadius: 5,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eee',
        },
    },
    notificationMessage: {
        fontSize: '0.9rem',
    },
    notificationTime: {
        display: 'inline-block',
        fontSize: '0.8rem',
        color: '#aaa',
    },
    notificationIcon: {
        marginLeft: 7,
        fontSize: '0.8rem',
        color: '#aaa',
        '&:hover': {
            color: 'crimson',
        },
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
}));
