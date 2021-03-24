import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    commentForm: {
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
    commentField: {
        padding: 10,
        background: 'white',
        border: '1px solid #ddd',
        marginBottom: 5,
    },
    addCommentSection: {
        display: 'flex',
        flexDirection: 'row-reverse',
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
    deleteIcon: {
        fontSize: '1.15rem',
        color: '#ccc',
        cursor: 'pointer',
        '&:hover': {
            color: '#F86A6A',
        },
    },
    commentLine: {
        marginBottom: 5,
    },
}));
