import { useStyles } from '../static/logoStyle';
import SchoolIcon from '@material-ui/icons/School';

export default function Logo() {
    const classes = useStyles();
    return (
        <div className={classes.logoWrapper}>
            <LogoIcon />
            <span className={classes.logoText}>과토리</span>
        </div>
    );
}

export function LogoIcon() {
    const classes = useStyles();
    return <SchoolIcon className={classes.logoIcon} />;
}

export function MobileLogo() {
    const classes = useStyles();
    return (
        <div className={classes.mobileLogoWrapper}>
            <SchoolIcon className={classes.logoIcon} />
            <span className={classes.mobileLogoText}>과토리</span>
        </div>
    );
}
