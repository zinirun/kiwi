import { useMutation, useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';
import { Button, Form, Input, message, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useStyles } from '../styles/report.style';
import { GET_ALL_MAIN_NOTICE, CREATE_MAIN_NOTICE, DELETE_MAIN_NOTICE } from '../../configs/queries';

const { confirm } = Modal;

export default function MainNoticeContainer() {
    const [notices, setNotices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form] = Form.useForm();
    const { data: noticesData, error: noticesError, refetch: noticesRefetch } = useQuery(
        GET_ALL_MAIN_NOTICE,
    );
    const [createMainNotice] = useMutation(CREATE_MAIN_NOTICE);

    useEffect(() => {
        if (noticesData) {
            setNotices(noticesData.getAllMainNotice);
        }
        if (noticesError) {
            message.error('메인 공지 조회 중 문제가 발생했습니다.');
        }
    }, [noticesData, noticesError]);

    const handleCreateNotice = (inputs) => {
        confirm({
            title: '메인 공지를 등록할까요?',
            content:
                '메인 공지는 모든 회원에게 알림이 전송되며 사이트 메인에 노출됩니다. 오탈자에 유의해주시고, 알림 기간 후에는 꼭 삭제해주세요.',
            icon: <></>,
            okText: '등록',
            cancelText: '취소',
            onOk() {
                createMainNotice({
                    variables: { ...inputs },
                })
                    .then(() => {
                        form.resetFields();
                        noticesRefetch();
                        message.success(`메인 공지를 게시했습니다.`);
                    })
                    .catch(() => {
                        message.error('메인 공지 등록 중 문제가 발생했습니다.');
                    });
            },
        });
    };

    const handleShowForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    };

    return (
        <>
            <Form onFinish={handleCreateNotice} form={form}>
                {showForm && (
                    <Space size={8}>
                        <Form.Item
                            name="type"
                            rules={[{ required: true, message: '타입을 입력하세요.' }]}
                        >
                            <Input name="type" placeholder="타입" autoFocus />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            rules={[{ required: true, message: '공지 내용을 입력하세요.' }]}
                        >
                            <Input name="content" placeholder="공지 내용" />
                        </Form.Item>
                    </Space>
                )}
                <Form.Item>
                    {showForm ? (
                        <Space size={4}>
                            <Button type="primary" htmlType="submit">
                                공지 추가
                            </Button>
                            <Button type="danger" onClick={handleShowForm}>
                                취소
                            </Button>
                            <span style={{ marginLeft: 10, color: 'dodgerblue' }}>
                                * 타입: 점검/일반/경고/광고 중 입력
                            </span>
                        </Space>
                    ) : (
                        <Button onClick={handleShowForm}>공지 추가</Button>
                    )}
                </Form.Item>
            </Form>
            {notices.map((notice) => (
                <MainNoticeViewer key={notice.id} notice={notice} refetch={noticesRefetch} />
            ))}
        </>
    );
}

function MainNoticeViewer({ notice, refetch }) {
    const classes = useStyles();
    const [deleteMainNotice] = useMutation(DELETE_MAIN_NOTICE);

    const handleDeleteNotice = () => {
        confirm({
            title: `메인 공지를 삭제할까요? (#${notice.id})`,
            icon: <></>,
            okText: '삭제',
            cancelText: '취소',
            onOk() {
                deleteMainNotice({
                    variables: {
                        id: notice.id,
                    },
                })
                    .then(() => {
                        refetch();
                        message.success(`#${notice.id} 메인 공지를 삭제했습니다.`);
                    })
                    .catch(() => {
                        message.error('메인 공지 삭제 중 문제가 발생했습니다.');
                    });
            },
        });
    };

    return (
        <Grid container className={classes.reportWrapper} alignItems="center">
            <Grid item xs={12} sm={11}>
                <p className={classes.reportContent}>{notice.content}</p>
            </Grid>
            <Grid item xs={12} sm={1}>
                {notice.isDeleted === 0 ? (
                    <Button block type="danger" onClick={handleDeleteNotice}>
                        삭제
                    </Button>
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: 5,
                            color: '#888',
                        }}
                    >
                        삭제됨
                    </div>
                )}
            </Grid>
        </Grid>
    );
}
