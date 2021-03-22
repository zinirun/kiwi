import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    postWrapper: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: 5,
        padding: 10,
        color: 'inherit',
        '&:hover': {
            backgroundColor: '#eee',
            color: 'inherit',
        },
    },
    title: {
        marginBottom: 3,
    },
    part: {
        background: theme.palette.primary.main,
        padding: '2px 6px',
        fontSize: 11.5,
        color: 'white',
        borderRadius: '10px',
        marginRight: 5,
    },
    upIcon: {
        width: 16,
        color: theme.palette.primary.main,
    },
    commentIcon: {
        width: 16,
        marginLeft: 15,
        color: theme.palette.primary.main,
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
    infoWrapper: {
        color: '#bbb',
        fontSize: '0.75rem',
    },
    author: {
        color: '#777',
    },
    flexWrapper: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    commentWrapper: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: 5,
        padding: 10,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        color: 'inherit',
        '&:hover': {
            backgroundColor: '#eee',
            color: 'inherit',
        },
    },
    commentLine: {
        marginBottom: 5,
    },
}));
