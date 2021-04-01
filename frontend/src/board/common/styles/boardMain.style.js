import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: 235,
        border: '1px solid #ddd',
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        boxShadow: 'none',
    },
    noticePaper: {
        border: '1px solid #ddd',
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        boxShadow: 'none',
        padding: 7,
        paddingBottom: 0,
    },
    noticeWrapper: {
        fontSize: '0.85rem',
        marginBottom: 10,
    },
    noticeType: {
        fontSize: '0.675rem',
        fontWeight: 'bold',
        padding: 4,
        marginRight: 7,
        borderRadius: 3,
        color: 'white',
    },
    titleChip: {
        cursor: 'pointer',
        background: 'transparent',
        color: '#777777',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '25px 8px',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    bestChip: {
        background: 'transparent',
        color: '#777777',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '25px 8px',
    },
    iconColor: {
        color: theme.palette.primary.main,
        fontSize: '1.2rem',
    },
    title: {
        fontSize: '1rem',
        color: '#777777',
        fontWeight: 'bold',
        padding: '8px 10px',
    },
    listItem: {
        padding: '2px 10px',
    },
    listItemText: {
        fontSize: '0.8rem',
        padding: '1px 1px',
    },
    upIcon: {
        color: theme.palette.primary.main,
    },
    addIcon: {
        color: theme.palette.primary.main,
        fontSize: 15,
        marginTop: 18,
        cursor: 'pointer',
    },
    commentChip: {
        marginTop: 6,
        background: 'white',
    },
    postLink: {
        color: 'inherit',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));
