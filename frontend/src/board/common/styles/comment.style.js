import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    upIcon: {
        fontSize: 15,
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    commentChip: {
        marginTop: 10,
        background: 'transparent',
    },
    commentField: {
        background: 'white',
        border: '1px solid #ddd',
        marginBottom: 5,
    },
    comment: {
        marginBottom: 5,
        fontSize: '1.05rem',
        fontWeight: 'bold',
        color: '#999',
    },
    deleteIcon: {
        marginLeft: 5,
        fontSize: '0.9rem',
        color: '#ccc',
        cursor: 'pointer',
        '&:hover': {
            color: '#F86A6A',
        },
    },
    addCommentSection: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    commentForm: {
        marginTop: 15,
    },
    commentTextareaSection: {
        marginBottom: 10,
    },
    authorInfo: {
        color: '#999',
        fontSize: '0.5rem',
    },
    author: {
        color: '#000000DE',
        fontSize: '0.78rem',
    },
}));
