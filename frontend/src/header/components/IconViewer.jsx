import React from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ForumIcon from '@material-ui/icons/Forum';
import StarsIcon from '@material-ui/icons/Stars';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StorageIcon from '@material-ui/icons/Storage';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import TelegramIcon from '@material-ui/icons/Telegram';
import CommentIcon from '@material-ui/icons/Comment';
import SubjectIcon from '@material-ui/icons/Subject';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Filter7Icon from '@material-ui/icons/Filter7';
import BuildIcon from '@material-ui/icons/Build';
export function IconViewer({ icon, classes }) {
    switch (icon) {
        case 'VolumeUpIcon':
            return <VolumeUpIcon className={classes && classes} />;
        case 'ForumIcon':
            return <ForumIcon className={classes && classes} />;
        case 'StorageIcon':
            return <StorageIcon className={classes && classes} />;
        case 'StarsIcon':
            return <StarsIcon className={classes && classes} />;
        case 'LocalGroceryStoreIcon':
            return <LocalGroceryStoreIcon className={classes && classes} />;
        case 'PersonOutlineIcon':
            return <PersonOutlineIcon className={classes && classes} />;
        case 'WhatshotIcon':
            return <WhatshotIcon className={classes && classes} />;
        case 'LooksOneIcon':
            return <LooksOneIcon className={classes && classes} />;
        case 'TelegramIcon':
            return <TelegramIcon className={classes && classes} />;
        case 'CommentIcon':
            return <CommentIcon className={classes && classes} />;
        case 'SubjectIcon':
            return <SubjectIcon className={classes && classes} />;
        case 'StarBorderIcon':
            return <StarBorderIcon className={classes && classes} />;
        case 'SupervisedUserCircleIcon':
            return <SupervisedUserCircleIcon className={classes && classes} />;
        case 'DateRangeIcon':
            return <DateRangeIcon className={classes && classes} />;
        case 'Filter7Icon':
            return <Filter7Icon className={classes && classes} />;
        case 'BuildIcon':
            return <BuildIcon className={classes && classes} />;
        default:
            return <></>;
    }
}
