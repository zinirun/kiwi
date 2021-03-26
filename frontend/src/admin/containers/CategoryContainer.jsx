import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CREATE_CATEGORY, GET_ALL_CATEGORIES } from '../../configs/queries';

const { confirm } = Modal;

const columns = [
    {
        title: 'ID',
        dataIndex: 'categoryId',
        key: 'categoryId',
    },
    {
        title: '게시판 ID',
        dataIndex: 'boardId',
        key: 'boardId',
    },
    {
        title: '카테고리 이름',
        dataIndex: 'categoryName',
        key: 'categoryName',
    },
    {
        title: '생성일',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

export default function CategoryContainer() {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form] = Form.useForm();
    const { data, error, refetch } = useQuery(GET_ALL_CATEGORIES);
    const [createCategory] = useMutation(CREATE_CATEGORY);

    useEffect(() => {
        if (data) {
            setCategories(
                data.getAllCategories.map((d) => {
                    return {
                        ...d,
                        key: d.categoryId,
                        createdAt: new moment(d.createdAt).format('YYYY-MM-DD HH:mm'),
                    };
                }),
            );
        }
        if (error) {
            message.error('학과 조회 중 문제가 발생했습니다.');
        }
    }, [data, error]);

    const handleShowForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    };

    const handleSubmit = ({ categoryName, boardId }) => {
        confirm({
            title: `[${categoryName}] 카테고리를 [ID ${boardId}] 게시판에 추가할까요?`,
            icon: <></>,
            content: '오탈자에 유의하여 주세요.',
            okText: '추가',
            cancelText: '취소',
            onOk() {
                createCategory({
                    variables: {
                        category: {
                            categoryName,
                            boardId,
                        },
                    },
                })
                    .then(() => {
                        form.resetFields();
                        refetch();
                        message.success(
                            `[${categoryName}] 카테고리를 [ID ${boardId}] 게시판에 추가했습니다.`,
                        );
                    })
                    .catch(() => {
                        message.error('카테고리 추가 중 문제가 발생했습니다.');
                    });
            },
        });
    };

    return (
        <>
            <Form onFinish={handleSubmit} form={form}>
                <Space size={4}>
                    {showForm && (
                        <>
                            <Form.Item
                                name="boardId"
                                rules={[{ required: true, message: '게시판 ID을 입력하세요.' }]}
                            >
                                <Input name="boardId" placeholder="게시판 ID" autoFocus />
                            </Form.Item>
                            <Form.Item
                                name="categoryName"
                                rules={[{ required: true, message: '카테고리 이름을 입력하세요.' }]}
                            >
                                <Input name="categoryName" placeholder="카테고리 이름" />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item>
                        {showForm ? (
                            <Space size={4}>
                                <Button type="primary" htmlType="submit">
                                    카테고리 추가
                                </Button>
                                <Button type="danger" onClick={handleShowForm}>
                                    취소
                                </Button>
                            </Space>
                        ) : (
                            <Button onClick={handleShowForm}>카테고리 추가</Button>
                        )}
                    </Form.Item>
                </Space>
            </Form>
            <Table dataSource={categories} columns={columns} />
        </>
    );
}
