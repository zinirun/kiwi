import { makeStyles } from '@material-ui/core/styles';
export const boardCommonStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        fontWeight: 'bold',
        background: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: 'white',
        },
    },
}));
