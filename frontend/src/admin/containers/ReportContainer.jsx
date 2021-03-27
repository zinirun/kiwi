import { useMutation, useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';
import { Button, Divider, Input, message, Modal, Space } from 'antd';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useStyles } from '../styles/report.style';
import { COMPLETE_REPORT, GET_REPORTS } from '../../configs/queries';

const { confirm } = Modal;

export default function ReportContainer() {
    const [reports, setReports] = useState([]);
    const { data: reportsData, error: reportsError, refetch: reportsRefetch } = useQuery(
        GET_REPORTS,
        {
            variables: {
                isCompleted: 0,
            },
        },
    );

    useEffect(() => {
        reportsRefetch().catch(() => {});
    }, [reportsRefetch]);

    useEffect(() => {
        if (reportsData) {
            setReports(
                reportsData.getReports.map((report) => {
                    return {
                        ...report,
                        createdAt: new moment(report.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (reportsError) {
            message.error('신고 조회 중 문제가 발생했습니다.');
        }
    }, [reportsData, reportsError]);

    return (
        <>
            {reports.map((report) => (
                <ReportContentViewer key={report.id} report={report} refetch={reportsRefetch} />
            ))}
        </>
    );
}

function ReportContentViewer({ report, refetch }) {
    const classes = useStyles();
    const [result, setResult] = useState('');
    const [completeReport] = useMutation(COMPLETE_REPORT);

    const handleCompleteReport = () => {
        confirm({
            title: `신고를 처리 완료할까요? (#${report.id})`,
            icon: <></>,
            content: '신고 처리 결과는 회원에게 알림으로 전송됩니다.',
            okText: '처리 완료',
            cancelText: '취소',
            onOk() {
                completeReport({
                    variables: {
                        id: report.id,
                        reporterId: report.userId,
                        result,
                    },
                })
                    .then(() => {
                        refetch();
                        message.success(`#${report.id} 신고를 처리 완료했습니다.`);
                    })
                    .catch(() => {
                        message.error('신고 처리 완료 중 문제가 발생했습니다.');
                    });
            },
        });
    };

    const handleResultChange = useCallback((e) => {
        setResult(e.target.value);
    }, []);

    return (
        <Grid container spacing={1} className={classes.reportWrapper}>
            <Grid item xs={12} sm={6}>
                <span className={classes.reportId}>#{report.id}</span>
                <span className={classes.reportUser}>
                    {report.deptName}/{report.userName}
                    <span className={classes.reportUserId}>(ID: {report.userId})</span>
                </span>
                <span className={classes.date}>{report.createdAt}</span>
            </Grid>
            <Grid item xs={12} sm={6} align="right">
                <Space>
                    <Input
                        className={classes.input}
                        placeholder="처리결과 입력"
                        size="small"
                        onChange={handleResultChange}
                        value={result}
                    />
                    <Button size="small" onClick={handleCompleteReport}>
                        완료
                    </Button>
                </Space>
            </Grid>
            <Grid item xs={12}>
                <Divider className={classes.reportDivider} />
                <p className={classes.reportContent}>{report.content}</p>
            </Grid>
        </Grid>
    );
}
