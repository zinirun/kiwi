import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 330,
        border: '1px solid #ddd',
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        boxShadow: 'none',
    },
    titleChipStyle: {
        background: 'white',
        color: '#777777',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '25px 8px',
    },
    iconColor: {
        color: theme.palette.primary.main,
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
    },
    commentChip: {
        marginTop: 6,
        background: 'white',
    },
    gridContainer: {
        paddingTop: 15,
    },
}));
