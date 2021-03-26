import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
    reportInfoTitle: {
        fontSize: '0.8rem',
        marginBottom: 2,
        color: '#555',
    },
    reportInfoLine: {
        marginBottom: 0,
        fontSize: '0.8rem',
        color: '#999',
    },
}));
