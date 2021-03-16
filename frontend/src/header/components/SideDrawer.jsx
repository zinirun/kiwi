import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useStyles } from '../static/style';
import { SITE_MENU, MY_MENU } from '../configs';
import Logo from '../../common/components/Logo';
import { Link } from 'react-router-dom';
import { IconViewer } from './IconViewer';
import SideUserSection from './SideUserSection';

export default function SideDrawer({ user }) {
    const classes = useStyles();
    return (
        <div className={classes.sideDrawerWrapper}>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Logo />
            </Link>
            <Divider className={classes.sideDivider} />
            <SideUserSection user={user} />
            <Divider className={classes.sideDivider} />
            <List>
                {SITE_MENU.map((m) => (
                    <Link to={m.link} style={{ textDecoration: 'none' }} key={m.key}>
                        <ListItem className={classes.drawerItem} button>
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
