import { Button, Grid } from '@material-ui/core';
import { Space, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/group.style';

export default function MyGroupContainer() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.groupMenuWrapper}>
                <>
                    <Form>
                        <Form.Item noStyle>
                            <Input />
                        </Form.Item>
                    </Form>
                    <Button className={classes.button} size="small">
                        만들기
                    </Button>
                </>
            </div>
            <Grid
                className={classes.groupWrapper}
                container
                component={Link}
                to={`/`}
                alignItems="center"
            >
                <Grid item xs={12} sm={7}>
                    <span className={classes.groupTitle}>{'안녕하세요'}</span>
                </Grid>
                <Grid item className={classes.groupInfoWrapper} xs={12} sm={5} align="right">
                    <Space direction="vertical" size={3}>
                        <div>
                            <span className={classes.groupInfoTitle}>마스터</span>
                            <span className={classes.groupMaster}>4학년/허전진</span>
                        </div>
                        <div>
                            <span className={classes.groupInfoTitle}>멤버</span>
                            <span className={classes.groupMember}>3학년/신창우 등 3명</span>
                        </div>
                    </Space>
                </Grid>
            </Grid>
        </div>
    );
}
