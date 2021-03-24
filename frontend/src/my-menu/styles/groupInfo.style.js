import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    groupInfoCollapse: {
        marginBottom: 15,
        borderRadius: '5px',
        '& .ant-collapse-content': {
            borderRadius: '0 0 5px 5px !important',
        },
    },
    groupInfoTitle: {
        marginRight: 5,
        color: '#999',
    },
    groupMaster: {
        color: '#555',
    },
    groupInfoItemWrapper: {
        marginTop: 7,
    },
    groupMember: {
        color: '#333',
        fontSize: '0.8rem',
        padding: '1.5px 6px',
        borderRadius: 3,
    },
    deleteIcon: {
        fontSize: '1.15rem',
        color: '#ccc',
        cursor: 'pointer',
        '&:hover': {
            color: '#F86A6A',
        },
    },
}));
