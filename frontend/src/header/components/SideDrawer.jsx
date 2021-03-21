import React, { useCallback, useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useStyles } from '../static/style';
import Logo from '../../common/components/Logo';
import { Link, useHistory } from 'react-router-dom';
import { IconViewer } from './IconViewer';
import SideUserSection from './SideUserSection';
import { EXTRA_BOARDS, MY_MENU } from '../../configs/siteMenu';
import { GET_BOARDS } from '../../configs/queries';
import { useQuery } from '@apollo/react-hooks';
import { message, Tooltip } from 'antd';
import { useDarkreader, Switch } from 'react-darkreader';
import { withCookies } from 'react-cookie';

export default withCookies(function SideDrawer({ user, cookies }) {
    const classes = useStyles();
    const [isDark, { toggle }] = useDarkreader(false);
    const history = useHistory();
    const [boards, setBoards] = useState([]);
    const { data: boardsData, loading: boardsLoading, error: boardsError } = useQuery(GET_BOARDS);
    const [darkFromCookie, setDarkFromCookie] = useState(false);

    useEffect(() => {
        if (!darkFromCookie) {
            const isDark = cookies.get('darkmode');
            isDark === 'true' && toggle();
            setDarkFromCookie(true);
        }
    }, [darkFromCookie, cookies, toggle]);

    useEffect(() => {
        if (boardsData) {
            setBoards(boardsData.getBoards);
        }
        if (boardsError) {
            message.error('게시판을 가져오는 중 문제가 발생했습니다.');
            history.push('/needsign');
        }
    }, [boardsData, boardsError, history]);

    const handleDarkToggle = useCallback(() => {
        toggle();
        cookies.set('darkmode', !isDark);
    }, [isDark, cookies, toggle]);

    return (
        <div className={classes.sideDrawerWrapper}>
            <Tooltip title="다크모드">
                <div className={classes.darkReader}>
                    <Switch checked={isDark} onChange={handleDarkToggle} styling="fluent" />
                </div>
            </Tooltip>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Logo />
            </Link>
            <Divider className={classes.sideDivider} />
            <SideUserSection user={user} />
            <Divider className={classes.sideDivider} />
            {!boardsLoading && (
                <List className={classes.menuList}>
                    {EXTRA_BOARDS.map((m) => (
                        <Link to={m.link} style={{ textDecoration: 'none' }} key={m.id}>
                            <ListItem className={classes.drawerItem} button>
                                <ListItemIcon className={classes.drawerIcon}>
                                    <IconViewer icon={m.icon} />
                                </ListItemIcon>
                                <ListItemText className={classes.drawerText}>
                                    {m.boardName}
                                </ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                    <Divider className={classes.sideDivider} />
                    {boards.map((m) => (
                        <Link to={`/board/${m.link}`} style={{ textDecoration: 'none' }} key={m.id}>
                            <ListItem className={classes.drawerItem} button>
                                <ListItemIcon className={classes.drawerIcon}>
                                    <IconViewer icon={m.icon} />
                                </ListItemIcon>
                                <ListItemText className={classes.drawerText}>
                                    {m.boardName}
                                </ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                    <Divider className={classes.sideDivider} />
                    {MY_MENU.map((m) => (
                        <Link to={m.link} style={{ textDecoration: 'none' }} key={m.id}>
                            <ListItem className={classes.drawerItem} button>
                                <ListItemIcon className={classes.drawerIcon}>
                                    <IconViewer icon={m.icon} />
                                </ListItemIcon>
                                <ListItemText className={classes.drawerText}>
                                    {m.boardName}
                                </ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            )}
        </div>
    );
});
