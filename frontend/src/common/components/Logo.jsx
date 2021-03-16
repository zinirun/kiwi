import { Space } from 'antd';
import React from 'react';
import { useStyles } from '../static/logo.style';

export default function Logo() {
    const classes = useStyles();
    return (
        <Space className={classes.logoWrapper}>
            <LogoIcon />
            <span className={classes.textLogo}>k!wi</span>
        </Space>
    );
}

export function LogoIcon() {
    const classes = useStyles();
    return <img className={classes.logoImg} src="/assets/kiwi-logo.svg" alt="kiwi-logo" />;
}

export function MobileLogo() {
    const classes = useStyles();
    return (
        <div className={classes.mobileLogoWrapper}>
            <img className={classes.mobileLogoImg} src="/assets/kiwi-logo.svg" alt="kiwi-logo" />
        </div>
    );
}
