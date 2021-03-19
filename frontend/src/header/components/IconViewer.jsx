import React from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ForumIcon from '@material-ui/icons/Forum';
import StarsIcon from '@material-ui/icons/Stars';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StorageIcon from '@material-ui/icons/Storage';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LooksOneIcon from '@material-ui/icons/LooksOne';

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
        default:
            return <></>;
    }
}
