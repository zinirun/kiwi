import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    reportWrapper: {
        backgroundColor: '#fafafa',
        padding: 5,
        marginBottom: 15,
        border: '1px solid #ddd',
        borderRadius: 4,
        fontSize: '0.85rem',
    },
    reportId: {
        marginRight: 5,
        color: '#999',
    },
    reportUser: {
        color: '#222',
    },
    reportUserId: {
        fontSize: '0.75rem',
        color: '#999',
        marginLeft: 5,
    },
    date: {
        color: '#999',
        fontSize: '0.75rem',
    },
    reportContent: {
        color: '#222',
        marginBottom: 0,
    },
    reportDivider: {
        marginTop: 0,
        marginBottom: 10,
    },
}));
