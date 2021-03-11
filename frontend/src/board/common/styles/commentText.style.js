import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    comment: {
        marginBottom: 5,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    addCommentSection: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    button: {
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        background: theme.palette.primary.main,
    },
    commentForm: {
        marginTop: 15,
    },
    commentTextareaSection: {
        marginBottom: 10,
    },
}));
