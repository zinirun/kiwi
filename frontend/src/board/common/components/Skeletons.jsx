import { Grid } from '@material-ui/core';
import { Skeleton } from 'antd';
export function PostContentSkeleton() {
    return <Skeleton active paragraph={{ rows: 10 }} />;
}

export function PostCommentSkeleton() {
    return <Skeleton active paragraph={{ rows: 5 }} />;
}

export function BoardListSkeleton() {
    return <Skeleton active paragraph={{ rows: 15 }} />;
}

export function BoardMainSkeleton() {
    return (
        <Grid container>
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <Grid key={i} item xs={12} sm={6}>
                    <Skeleton active paragraph={{ rows: 5 }} />
                </Grid>
            ))}
        </Grid>
    );
}
