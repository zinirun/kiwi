import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useStyles } from '../static/style';
import { SITE_MENU, MY_MENU } from '../configs';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ForumIcon from '@material-ui/icons/Forum';
import StarsIcon from '@material-ui/icons/Stars';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StorageIcon from '@material-ui/icons/Storage';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Logo from '../../common/components/Logo';
import { Link } from 'react-router-dom';

function IconViewer({ icon }) {
    switch (icon) {
        case 'VolumeUpIcon':
            return <VolumeUpIcon />;
        case 'ForumIcon':
            return <ForumIcon />;
        case 'StorageIcon':
            return <StorageIcon />;
        case 'StarsIcon':
            return <StarsIcon />;
        case 'LocalGroceryStoreIcon':
            return <LocalGroceryStoreIcon />;
        case 'PersonOutlineIcon':
            return <PersonOutlineIcon />;
        default:
            return <></>;
    }
}

export default function SideDrawer() {
    const classes = useStyles();
    return (
        <div>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Logo />
            </Link>
            <Divider className={classes.sideDivider} />
            <List>
                {SITE_MENU.map((m) => (
                    <Link to={m.link} style={{ textDecoration: 'none' }}>
                        <ListItem className={classes.drawerItem} button key={m.key} to={m.link}>
                            <ListItemIcon className={classes.drawerIcon}>
                                <IconViewer icon={m.icon} />
                            </ListItemIcon>
                            <ListItemText className={classes.drawerText}>{m.name}</ListItemText>
                        </ListItem>
                    </Link>
                ))}
                <Divider className={classes.sideDivider} />
                {MY_MENU.map((m) => (
                    <ListItem className={classes.drawerItem} button key={m.key}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <IconViewer icon={m.icon} />
                        </ListItemIcon>
                        <ListItemText className={classes.drawerText}>{m.name}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
