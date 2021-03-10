import { useStyles } from '../static/logoStyle';

export default function Logo() {
    const classes = useStyles();
    return (
        <div className={classes.logoWrapper}>
            <div>
                <LogoIcon />
            </div>
            <p className={classes.logoText}>kiwi</p>
        </div>
    );
}

export function LogoIcon() {
    const classes = useStyles();
    return (
        <img className={classes.logoImg} width="50px" src="/assets/kiwi-logo.svg" alt="kiwi-logo" />
    );
}

export function MobileLogo() {
    const classes = useStyles();
    return (
        <div className={classes.mobileLogoWrapper}>
            <img className={classes.mobileLogoImg} src="/assets/kiwi-logo.svg" alt="kiwi-logo" />
        </div>
    );
}
