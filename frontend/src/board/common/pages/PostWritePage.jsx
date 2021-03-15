import React from 'react';
import { useLocation } from 'react-router';
import QueryString from 'query-string';
import { Button } from '@material-ui/core';
import { Form, Input } from 'antd';
import PageTitle from '../../../common/components/PageTitle';
import { useStyles } from '../styles/postWrite.style';

const { TextArea } = Input;

export default function PostWritePage() {
    const classes = useStyles();
    const { search } = useLocation();
    const query = QueryString.parse(search);

    console.log(query.boardId, query.categoryId);
    return (
        <Form>
            <PageTitle title="글쓰기" />
            <Form.Item>
                <TextArea className={classes.textarea} rows={13} />
            </Form.Item>
            <Form.Item>
                <div className={classes.flexReverse}>
                    <Button type="submit" className={classes.button}>
                        글쓰기
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}
