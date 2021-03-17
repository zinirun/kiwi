import { makeStyles } from '@material-ui/core/styles';
export const boardCommonStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        background: theme.palette.primary.main,
        marginTop: 27,
    },
}));
