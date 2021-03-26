import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Checkbox, Form, Input, message, Modal, Space, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CREATE_BOARD, GET_ALL_BOARDS } from '../../configs/queries';

const { confirm } = Modal;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '게시판 이름',
        dataIndex: 'boardName',
        key: 'boardName',
    },
    {
        title: '링크',
        dataIndex: 'link',
        key: 'link',
    },
    {
        title: '아이콘',
        dataIndex: 'icon',
        key: 'icon',
    },
    {
        title: '생성일',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

export default function BoardContainer() {
    const [boards, setBoards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form] = Form.useForm();
    const { data, error, refetch } = useQuery(GET_ALL_BOARDS);
    const [createBoard] = useMutation(CREATE_BOARD);

    useEffect(() => {
        if (data) {
            setBoards(
                data.getAllBoards.map((d) => {
                    return {
                        ...d,
                        key: d.id,
                        createdAt: new moment(d.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (error) {
            message.error('게시판 조회 중 문제가 발생했습니다.');
        }
    }, [data, error]);

    const handleShowForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    };

    const handleSubmit = (inputs) => {
        confirm({
            title: `[${inputs.boardName}] 게시판을 추가할까요?`,
            icon: <></>,
            content: '오탈자에 유의하여 주세요.',
            okText: '추가',
            cancelText: '취소',
            onOk() {
                createBoard({
                    variables: {
                        board: {
                            ...inputs,
                            isSpecial: inputs.isSpecial ? 1 : 0,
                        },
                    },
                })
                    .then(() => {
                        form.resetFields();
                        refetch();
                        message.success(`[${inputs.boardName}] 게시판을 추가했습니다.`);
                    })
                    .catch(() => {
                        message.error('게시판 추가 중 문제가 발생했습니다.');
                    });
            },
        });
    };

    return (
        <>
            <Form onFinish={handleSubmit} form={form}>
                {showForm && (
                    <>
                        <Space size={10}>
                            <Form.Item
                                name="boardName"
                                rules={[{ required: true, message: '게시판 이름을 입력하세요.' }]}
                            >
                                <Input name="boardName" placeholder="게시판 이름" autoFocus />
                            </Form.Item>
                            <Form.Item
                                name="link"
                                rules={[{ required: true, message: '링크를 입력하세요.' }]}
                            >
                                <Input name="link" placeholder="링크" />
                            </Form.Item>
                        </Space>
                        <Space size={10}>
                            <Form.Item
                                name="icon"
                                rules={[{ required: true, message: '아이콘을 입력하세요.' }]}
                            >
                                <Input name="icon" placeholder="아이콘" />
                            </Form.Item>
                            <Form.Item name="isSpecial" valuePropName="checked">
                                <Checkbox name="isSpecial">학과관계자만 글쓰기 권한 부여</Checkbox>
                            </Form.Item>
                        </Space>
                    </>
                )}
                <Form.Item>
                    {showForm ? (
                        <Space size={4}>
                            <Button type="primary" htmlType="submit">
                                추가
                            </Button>
                            <Button type="danger" onClick={handleShowForm}>
                                취소
                            </Button>
                        </Space>
                    ) : (
                        <Button onClick={handleShowForm}>게시판 추가</Button>
                    )}
                </Form.Item>
            </Form>
            <Table dataSource={boards} columns={columns} />
        </>
    );
}
