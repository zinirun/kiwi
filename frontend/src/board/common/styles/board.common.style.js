import { makeStyles } from '@material-ui/core/styles';
export const boardCommonStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.925rem',
        height: 40,
        padding: '0 20px',
        borderRadius: 30,
        background: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: 'white',
        },
    },
}));
