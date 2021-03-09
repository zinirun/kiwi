import { useStyles } from '../static/logoStyle';
import SchoolIcon from '@material-ui/icons/School';

export default function Logo() {
    const classes = useStyles();
    return (
        <div className={classes.logoWrapper}>
            <SchoolIcon className={classes.logoIcon} />
            <span className={classes.logoText}>과토리</span>
        </div>
    );
}
