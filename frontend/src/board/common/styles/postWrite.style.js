import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    textarea: {
        resize: 'none',
        fontSize: '1rem',
        padding: 10,
        borderRadius: 5,
    },
    flexReverse: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    itemWrapper: {
        marginBottom: 10,
    },
}));
