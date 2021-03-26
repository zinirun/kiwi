import React from 'react';
import { Input } from 'antd';
import { Grid } from '@material-ui/core';

const { Search } = Input;

const onSearch = (value) => {
    console.log(value);
};

export default function UserContainer() {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Search
                        placeholder="아이디로 조회"
                        enterButton="조회"
                        size="middle"
                        style={{ width: 300 }}
                        onSearch={onSearch}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Search
                        placeholder="학번으로 조회"
                        allowClear
                        enterButton="조회"
                        size="middle"
                        style={{ width: 300 }}
                        onSearch={onSearch}
                    />
                </Grid>
            </Grid>
        </>
    );
}
