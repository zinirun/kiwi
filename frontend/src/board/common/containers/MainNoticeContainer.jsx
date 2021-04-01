import React from 'react';
import { useStyles } from '../styles/boardMain.style';
import { Card } from '@material-ui/core';

export default function MainNoticeContainer({ notices }) {
    const classes = useStyles();

    return (
        <Card className={classes.noticePaper}>
            {notices.map((notice) => (
                <p key={notice.id} className={classes.noticeWrapper}>
                    <span
                        className={classes.noticeType}
                        style={{
                            backgroundColor: colorPickerByNoticeType(notice.type),
                        }}
                    >
                        {notice.type}
                    </span>
                    <span className={classes.noticeContent}>{notice.content}</span>
                </p>
            ))}
        </Card>
    );
}

function colorPickerByNoticeType(type) {
    switch (type) {
        case '점검':
            return 'crimson';
        case '경고':
            return '#ff9a02';
        case '일반':
            return '#4fa5f2';
        case '광고':
            return '#4cbc1d';
        default:
            break;
    }
}
