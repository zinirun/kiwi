import { EllipsisOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    noResultIcon: {
        '& svg': {
            fontSize: '3rem',
            color: theme.palette.primary.light,
        },
    },
}));

export default function NoResult({ title = '게시글' }) {
    const classes = useStyles();
    return (
        <Result
            icon={<EllipsisOutlined className={classes.noResultIcon} />}
            title={
                <span style={{ fontSize: 16, fontWeight: 'bold', color: '#999' }}>
                    {title}이 없습니다.
                </span>
            }
        />
    );
}
