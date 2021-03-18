import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    content: {
        maxWidth: 730,
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: 5,
        padding: '13px 15px',
    },
    part: {
        background: theme.palette.primary.main,
        width: 70,
        padding: '2px 6px',
        fontSize: 12,
        color: 'white',
        borderRadius: '10px',
        marginRight: 5,
    },
    upIcon: {
        fontSize: 15,
        color: theme.palette.primary.main,
    },
    commentIcon: {
        fontSize: 15,
        marginLeft: 15,
        color: theme.palette.primary.main,
    },
    date: {
        fontSize: 12,
        color: '#BBBBBB',
    },
    title: {
        cursor: 'pointer',
    },
    backColor: {
        marginLeft: -8,
        background: '#fafafa',
    },
    categorySelect: {
        minWidth: 150,
    },
    noResultIcon: {
        '& svg': {
            fontSize: '3rem',
            color: theme.palette.primary.light,
        },
    },
}));
