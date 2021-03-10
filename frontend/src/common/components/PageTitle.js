import React from 'react';
import { Typography } from '@material-ui/core';

export default function PageTitle({ title }) {
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
            {title}
        </Typography>
    );
}
