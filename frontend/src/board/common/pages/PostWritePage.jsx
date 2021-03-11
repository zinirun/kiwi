import { useLocation } from 'react-router';
import QueryString from 'query-string';
import { Grid } from '@material-ui/core';
import { Input } from 'antd';
import PageTitle from '../../../common/components/PageTitle';

const { TextArea } = Input;

export default function PostWritePage() {
    const { search } = useLocation();
    const query = QueryString.parse(search);

    console.log(query.boardId, query.categoryId);
    return (
        <>
            <PageTitle title="글쓰기" />
            <Grid container justify="center">
                <TextArea rows={10} />
            </Grid>
        </>
    );
}
