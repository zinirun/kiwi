import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    groupWrapper: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: 5,
        padding: 10,
        color: 'inherit',
        '&:hover': {
            backgroundColor: '#eee',
            color: 'inherit',
        },
    },
    groupMenuWrapper: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    groupTitle: {
        fontSize: '1.0rem',
        color: '#333',
    },
    groupInfoWrapper: {
        fontSize: '0.8rem',
    },
    groupInfoTitle: {
        marginRight: 3,
        color: '#555',
    },
    groupMaster: {
        color: '#999',
    },
    groupMember: {
        color: '#999',
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
