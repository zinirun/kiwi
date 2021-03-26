import React, { useEffect, useState } from 'react';
import PageTitle from '../../common/components/PageTitle';
import { useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_IS_ADMIN } from '../../configs/queries';
import { useHistory } from 'react-router';

export default function AdminPage() {
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const { data: isAdminData, loading: isAdminLoading } = useQuery(GET_LOCAL_IS_ADMIN);
    useEffect(() => {
        if (isAdminData) {
            const isAdmin = isAdminData.isAdmin;
            isAdmin ? setIsAdmin(true) : history.push('/');
        }
    }, [isAdminData, history]);
    return <>{!isAdminLoading && isAdmin && <PageTitle title="관리자 페이지" />}</>;
}
