import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    logoWrapper: {
        padding: '15px 47px',
    },
    logoImg: {
        width: '33px',
    },
    textLogo: {
        color: 'white',
        fontSize: '28px',
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
