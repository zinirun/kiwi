import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    logoWrapper: {
        padding: '15px 50px',
    },
    logoImg: {
        width: '40px',
    },
    textLogo: {
        color: 'white',
        fontSize: '24px',
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
