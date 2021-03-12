import React from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ForumIcon from '@material-ui/icons/Forum';
import StarsIcon from '@material-ui/icons/Stars';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StorageIcon from '@material-ui/icons/Storage';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

export function IconViewer({ icon }) {
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
