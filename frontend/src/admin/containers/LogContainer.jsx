import { useQuery } from '@apollo/react-hooks';
import { Button, message, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GET_ADMIN_LOGS } from '../../configs/queries';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '관리자ID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'LOG',
        dataIndex: 'log',
        key: 'log',
    },
    {
        title: '시간',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

export default function LogContainer() {
    const [logs, setLogs] = useState([]);
    const { data, error, refetch, loading } = useQuery(GET_ADMIN_LOGS);

    useEffect(() => {
        if (data) {
            setLogs(
                data.getAdminLogs.map((d) => {
                    return {
                        ...d,
                        key: d.id,
                        createdAt: new moment(d.createdAt).format('YY-MM-DD HH:mm:ss'),
                    };
                }),
            );
        }
        if (error) {
            message.error('로그 조회 중 문제가 발생했습니다.');
        }
    }, [data, error]);

    const handleRefetch = () => {
        refetch()
            .then(() => message.success('새로고침 되었습니다.'))
            .catch(() => message.error('새로고침 중 문제가 발생했습니다.'));
    };

    return (
        <>
            {!loading && <Button onClick={handleRefetch}>새로고침</Button>}
            <Table dataSource={logs} columns={columns} style={{ marginTop: 10 }} />
        </>
    );
}
