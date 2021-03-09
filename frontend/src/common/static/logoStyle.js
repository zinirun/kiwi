import { makeStyles } from '@material-ui/core/styles';

const logoHeight = '60px';
const mobileLogoHeight = '28px';

export const useStyles = makeStyles((theme) => ({
    logoWrapper: {
        height: logoHeight,
        textAlign: 'center',
    },
    logoIcon: {
        color: 'white',
        fontSize: '25px',
    },
    logoText: {
        textAlign: 'center',
        lineHeight: logoHeight,
        verticalAlign: 'middle',
        fontSize: '1.025rem',
        color: 'white',
        fontWeight: 'bold',
    },
    mobileLogoWrapper: {
        height: mobileLogoHeight,
        textAlign: 'center',
    },
    mobileLogoText: {
        textAlign: 'center',
        lineHeight: mobileLogoHeight,
        verticalAlign: 'middle',
        fontSize: '0.925rem',
        color: 'white',
        fontWeight: 'bold',
    },
}));
