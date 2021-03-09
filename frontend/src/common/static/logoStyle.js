import { makeStyles } from '@material-ui/core/styles';

const logoHeight = '60px';

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
        lineHeight: logoHeight,
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '1.025rem',
        color: 'white',
        fontWeight: 'bold',
    },
}));
