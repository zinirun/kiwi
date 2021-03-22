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
        padding: '0 10px',
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
        fontSize: '0.75rem',
        marginRight: 5,
    },
    author: {
        color: '#333',
        fontSize: '0.8rem',
    },
    flexWrapper: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
}));
