import { Grid } from '@material-ui/core';
import { Skeleton } from 'antd';
export function PostContentSkeleton() {
    return (
        <>
            <Skeleton active />
            <Skeleton active />
        </>
    );
}

export function BoardMainSkeleton() {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Skeleton avatar active paragraph={{ rows: 5 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton avatar active paragraph={{ rows: 5 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton avatar active paragraph={{ rows: 5 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton avatar active paragraph={{ rows: 5 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton avatar active paragraph={{ rows: 5 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton avatar active paragraph={{ rows: 5 }} />
                </Grid>
            </Grid>
        </>
    );
}
