import { useLocation } from 'react-router';
import QueryString from 'query-string';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Grid } from '@material-ui/core';
import { useStyles } from '../static/signPages.style';
import { CheckOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EmailAuthPage() {
    const classes = useStyles();
    const { search } = useLocation();
    const { sn, code } = QueryString.parse(search);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        if (sn && code) {
            axios
                .post('/api/user/emailauth', {
                    sn,
                    code,
                })
                .then(({ data }) => {
                    const { success, message } = data;
                    if (success) {
                        setStatus('success');
                        return;
                    }
                    switch (message) {
                        case 'ALREADY_DONE':
                            setStatus('already-done');
                            return;
                        default:
                            setStatus('reject');
                            return;
                    }
                });
        } else {
            setStatus('reject');
            return;
        }
    }, [code, sn]);

    return (
        <div className={classes.paper}>
            {status === 'loading' && (
                <Grid container align="center" spacing={2}>
                    <Grid item xs={12}>
                        <Spin size="large" />
                    </Grid>
                    <Grid item xs={12}>
                        <span className={classes.authText}>인증 처리 중입니다.</span>
                    </Grid>
                </Grid>
            )}
            {status === 'success' && (
                <Grid container align="center" spacing={2}>
                    <Grid item xs={12}>
                        <CheckOutlined className={classes.authIcon} />
                    </Grid>
                    <Grid item xs={12}>
                        <p className={classes.authText}>인증이 완료되었습니다.</p>
                        <p className={classes.authText}>
                            <Link to="/signin">로그인</Link> 후 키위를 이용하세요!
                        </p>
                    </Grid>
                </Grid>
            )}
            {status === 'reject' && (
                <Grid container align="center" spacing={2}>
                    <Grid item xs={12}>
                        <CloseCircleOutlined className={classes.authRedIcon} />
                    </Grid>
                    <Grid item xs={12}>
                        <p className={classes.authText}>잘못된 요청입니다.</p>
                    </Grid>
                </Grid>
            )}
            {status === 'already-done' && (
                <Grid container align="center" spacing={2}>
                    <Grid item xs={12}>
                        <CheckCircleOutlined className={classes.authRedIcon} />
                    </Grid>
                    <Grid item xs={12}>
                        <p className={classes.authText}>이미 인증이 완료되었습니다.</p>
                        <p className={classes.authText}>
                            <Link to="/signin">로그인</Link> 후 키위를 이용하세요!
                        </p>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}
