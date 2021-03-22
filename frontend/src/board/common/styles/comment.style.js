import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    upIcon: {
        width: 16,
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    commentChip: {
        background: 'transparent',
    },
    commentField: {
        padding: 10,
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
        fontSize: '1.15rem',
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
        marginRight: 3,
    },
    author: {
        color: '#333',
        fontSize: '0.8rem',
    },
    date: {
        marginLeft: 5,
        color: '#bbb',
        fontSize: '0.75rem',
    },
    flexWrapper: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    commentLine: {
        marginBottom: 5,
    },
}));
