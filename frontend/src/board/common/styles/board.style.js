import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    postWrapper: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: 5,
        padding: '13px 15px',
        color: 'inherit',
        '&:hover': {
            backgroundColor: '#eee',
            color: 'inherit',
        },
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
        background: 'transparent',
    },
    categorySelect: {
        minWidth: 150,
    },
    paginationWrapper: {
        marginTop: 20,
    },
}));
