import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    logoWrapper: {
        marginTop: '10px',
        textAlign: 'center',
    },
    logoImg: {
        width: '45px',
    },
    logoText: {
        margin: '-5px 0 10px',
        fontSize: '1.15rem',
        color: 'white',
        fontWeight: 'bold',
    },
    mobileLogoWrapper: {
        textAlign: 'center',
        paddingTop: '6px',
    },
    mobileLogoImg: {
        width: '35px',
    },
}));
