import { useMutation, useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';
import { message, Space, Collapse, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useStyles } from '../styles/groupInfo.style';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PageTitle from '../../common/components/PageTitle';

const { Panel } = Collapse;

export default function GroupInfoContainer({ id }) {
    const classes = useStyles();
    const handleDeleteGroupMember = (memberId) => {};
    return (
        <>
            <PageTitle title="블랙핑크" />
            <Collapse className={classes.groupInfoCollapse}>
                <Panel
                    classname={classes.groupInfoPanel}
                    header="그룹 정보"
                    key="group-info"
                    extra={
                        <Tooltip title="그룹 삭제">
                            <DeleteOutlinedIcon className={classes.deleteIcon} />
                        </Tooltip>
                    }
                >
                    <Grid className={classes.groupInfoWrapper} container>
                        <Grid item xs={12} sm={10}>
                            <div>
                                <span className={classes.groupInfoTitle}>개설일</span>
                                <span className={classes.groupMaster}>{'2021년 03월 23일'}</span>
                            </div>
                            <div className={classes.groupInfoItemWrapper}>
                                <span className={classes.groupInfoTitle}>마스터</span>
                                <span className={classes.groupMaster}>
                                    {'4학년'}/{'허전진'}
                                </span>
                            </div>
                            <div className={classes.groupInfoItemWrapper}>
                                <span className={classes.groupInfoTitle}>멤버</span>
                                <Tag
                                    className={classes.groupMember}
                                    closable
                                    onClose={() => handleDeleteGroupMember(1)}
                                >
                                    {'4학년'}/{'신창우'}{' '}
                                </Tag>
                            </div>
                        </Grid>
                    </Grid>
                </Panel>
            </Collapse>
        </>
    );
}
