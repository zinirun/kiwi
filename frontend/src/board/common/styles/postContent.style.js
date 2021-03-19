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
        color: '#0000008A',
    },
    deleteIcon: {
        cursor: 'pointer',
        '&:hover': {
            color: 'indianRed',
        },
    },
    upIcon: {
        fontSize: 15,
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },
    commentIcon: {
        fontSize: 15,
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
        background: 'white',
    },
    commentChip: {
        marginBottom: 10,
        marginTop: 10,
        background: 'white',
    },
    userInfoSection: {
        paddingBottom: 30,
    },
}));
