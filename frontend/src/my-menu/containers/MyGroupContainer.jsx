import { Button, Grid } from '@material-ui/core';
import { Form, Input, message, Space, Modal } from 'antd';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_GROUP } from '../../configs/queries';
import { useStyles } from '../styles/group.style';
import { useMutation } from 'react-apollo';

const { confirm } = Modal;

export default function MyGroupContainer() {
    const classes = useStyles();
    const [formVisible, setFormVisible] = useState(false);
    const [createGroup] = useMutation(CREATE_GROUP);
    const triggerCreateGroup = (title) => {
        createGroup({
            variables: {
                title,
            },
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(() => message.error('그룹 생성 중 문제가 발생했습니다.'));
    };
    const onSubmit = ({ title }) => {
        if (!title) {
            return message.error('그룹 이름을 입력하세요');
        }
        confirm({
            title: '그룹을 생성할까요?',
            icon: <></>,
            okText: '그룹 만들기',
            cancelText: '취소',
            onOk() {
                triggerCreateGroup(title);
            },
        });
    };
    const handleVisible = useCallback(
        (e) => {
            e.preventDefault();
            setFormVisible(!formVisible);
        },
        [formVisible],
    );
    return (
        <div>
            <Form onFinish={onSubmit}>
                <div className={classes.groupMenuWrapper}>
                    <Space>
                        {formVisible && (
                            <>
                                <Form.Item name="title" noStyle>
                                    <Input
                                        name="title"
                                        placeholder="그룹 이름을 입력하세요"
                                        maxLength={25}
                                        autoFocus
                                    />
                                </Form.Item>
                                <Button type="submit" className={classes.button} size="small">
                                    만들기
                                </Button>
                            </>
                        )}
                        <Button className={classes.button} size="small" onClick={handleVisible}>
                            {formVisible ? '취소' : '만들기'}
                        </Button>
                    </Space>
                </div>
            </Form>
            <Grid
                className={classes.groupWrapper}
                container
                component={Link}
                to={`/`}
                alignItems="center"
            >
                <Grid item xs={12} sm={7}>
                    <span className={classes.groupTitle}>{'안녕하세요'}</span>
                </Grid>
                <Grid item className={classes.groupInfoWrapper} xs={12} sm={5} align="right">
                    <Space direction="vertical" size={3}>
                        <div>
                            <span className={classes.groupInfoTitle}>마스터</span>
                            <span className={classes.groupMaster}>4학년/허전진</span>
                        </div>
                        <div>
                            <span className={classes.groupInfoTitle}>멤버</span>
                            <span className={classes.groupMember}>3학년/신창우 등 3명</span>
                        </div>
                    </Space>
                </Grid>
            </Grid>
        </div>
    );
}
