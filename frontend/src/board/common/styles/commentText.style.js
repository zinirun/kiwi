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
}));
