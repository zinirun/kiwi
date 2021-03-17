import React from 'react';
import { useLocation } from 'react-router';
import QueryString from 'query-string';
import { Button } from '@material-ui/core';
import { Form, Input } from 'antd';
import PageTitle from '../../../common/components/PageTitle';
import SelectCategory from '../components/SelectCategory';
import { useStyles } from '../styles/postWrite.style';

const { TextArea } = Input;

export default function PostWritePage() {
    const classes = useStyles();
    const { search } = useLocation();
    const { boardId } = QueryString.parse(search);

    const handleFinish = (form) => {
        console.log(form);
    };

    return (
        <Form onFinish={handleFinish}>
            <PageTitle title="글쓰기 - 커뮤니티" />
            {parseInt(boardId) === 3 && <SelectCategory />}
            <Form.Item name="title" rules={[{ required: true, message: '제목을 입력하세요.' }]}>
                <Input name="title" size="large" placeholder="제목을 입력하세요" />
            </Form.Item>
            <Form.Item name="content" rules={[{ required: true, message: '내용을 입력하세요.' }]}>
                <TextArea
                    name="content"
                    placeholder="내용을 입력하세요"
                    className={classes.textarea}
                    rows={13}
                />
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
