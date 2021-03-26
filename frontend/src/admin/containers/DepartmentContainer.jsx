import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CREATE_DEPARTMENT, GET_ALL_DEPARTMENTS } from '../../configs/queries';

const { confirm } = Modal;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '학과명',
        dataIndex: 'deptName',
        key: 'deptName',
    },
    {
        title: '생성일',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

export default function DepartmentContainer() {
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form] = Form.useForm();
    const { data, error, refetch } = useQuery(GET_ALL_DEPARTMENTS);
    const [createDepartment] = useMutation(CREATE_DEPARTMENT);

    useEffect(() => {
        if (data) {
            setDepartments(
                data.getAllDepartments.map((d) => {
                    return {
                        ...d,
                        key: d.id,
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

    const handleSubmit = ({ deptName }) => {
        confirm({
            title: `[${deptName}] 학과를 추가할까요?`,
            icon: <></>,
            content: '오탈자에 유의하여 주세요.',
            okText: '추가',
            cancelText: '취소',
            onOk() {
                createDepartment({
                    variables: {
                        deptName,
                    },
                })
                    .then(() => {
                        form.resetFields();
                        refetch();
                        message.success(`[${deptName}] 학과를 추가했습니다.`);
                    })
                    .catch(() => {
                        message.error('학과 추가 중 문제가 발생했습니다.');
                    });
            },
        });
    };

    return (
        <>
            <Form onFinish={handleSubmit} form={form}>
                <Space size={4}>
                    {showForm && (
                        <Form.Item
                            name="deptName"
                            rules={[{ required: true, message: '학과명을 입력하세요.' }]}
                        >
                            <Input name="deptName" placeholder="학과명" autoFocus />
                        </Form.Item>
                    )}
                    <Form.Item>
                        {showForm ? (
                            <Space size={4}>
                                <Button type="primary" htmlType="submit">
                                    학과 추가
                                </Button>
                                <Button type="danger" onClick={handleShowForm}>
                                    취소
                                </Button>
                            </Space>
                        ) : (
                            <Button onClick={handleShowForm}>학과 추가</Button>
                        )}
                    </Form.Item>
                </Space>
            </Form>
            <Table dataSource={departments} columns={columns} />
        </>
    );
}
