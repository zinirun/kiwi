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
    addCommentSection: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    commentTextareaSection: {
        marginBottom: 10,
    },
}));
