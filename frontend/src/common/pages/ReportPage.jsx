import { useMutation } from '@apollo/react-hooks';
import { Button, Grid } from '@material-ui/core';
import { Form, Input, message, Modal } from 'antd';
import { useHistory } from 'react-router';
import { CREATE_REPORT } from '../../configs/queries';
import PageTitle from '../components/PageTitle';
import { useStyles } from '../static/report.style';

const { TextArea } = Input;
const { confirm } = Modal;

export default function ReportPage() {
    const classes = useStyles();
    const history = useHistory();
    const [createReport] = useMutation(CREATE_REPORT);
    const handleFinish = ({ content }) => {
        confirm({
            title: '신고를 접수할까요?',
            icon: <></>,
            okText: '신고 접수',
            cancelText: '취소',
            onOk() {
                createReport({
                    variables: {
                        report: { content },
                    },
                })
                    .then(() => {
                        message.success('신고가 정상적으로 접수되었습니다. 신중히 검토하겠습니다.');
                        history.push('/');
                    })
                    .catch(() => {
                        message.error('신고 접수 중 문제가 발생했습니다.');
                    });
            },
        });
    };
    return (
        <>
            <PageTitle title="신고 접수" />
            <Form onFinish={handleFinish}>
                <Form.Item
                    name="content"
                    rules={[{ required: true, message: '내용을 입력하세요.' }]}
                >
                    <TextArea
                        name="content"
                        placeholder="신고 내용을 입력하세요"
                        rows={13}
                        maxLength={1000}
                    />
                </Form.Item>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <p className={classes.reportInfoTitle}>신고 안내</p>
                        <p className={classes.reportInfoLine}>
                            신고 내용을 가능한 상세히 기재해주세요.
                        </p>
                        <p className={classes.reportInfoLine}>
                            게시글, 댓글 신고는 게시글의 링크를 포함해주세요.
                        </p>
                        <p className={classes.reportInfoLine}>
                            허위 신고는 정지의 원인이 될 수 있습니다.
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6} align="right">
                        <Button type="submit" className={classes.button} size="small">
                            안내를 읽었으며 신고를 접수합니다
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </>
    );
}
