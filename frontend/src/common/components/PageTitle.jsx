import React from 'react';
import { Typography } from '@material-ui/core';
import { LeftOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    backBtn: {
        color: '#bbb',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

export default function PageTitle({ title }) {
    const history = useHistory();
    const classes = useStyles();

    const handleGoBack = () => {
        history.goBack();
    };

    return (
        <Typography
            style={{
                color: '#777',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                padding: '10px 0 5px 2px',
                marginBottom: 15,
            }}
        >
            <LeftOutlined className={classes.backBtn} onClick={handleGoBack} /> {title}
        </Typography>
    );
}
