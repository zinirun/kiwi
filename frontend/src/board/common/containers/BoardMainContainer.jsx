import React from 'react';
import { useStyles } from '../styles/boardMain.style';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
// import ForumIcon from '@material-ui/icons/Forum';
// import StarsIcon from '@material-ui/icons/Stars';
// import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
// import StorageIcon from '@material-ui/icons/Storage';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { Chip, Divider, Card, List, ListItem, ListItemText } from '@material-ui/core';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

export default function BoardMainContainer({ boardId }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Row justify="center" align="center">
                <Col span={22}>
                    <Chip
                        className={classes.titleChipStyle}
                        icon={<VolumeUpIcon className={classes.iconColor} />}
                        label="학과공지"
                    />
                </Col>
                <Col span={2}>
                    <AddCircleOutlineSharpIcon className={classes.addIcon} />
                </Col>
            </Row>
            <Divider />
            <List>
                <Row justify="center" align="center">
                    <Col span={20}>
                        <ListItem classes={{ root: classes.listItem }} button>
                            <ListItemText
                                classes={{ primary: classes.listItemText }}
                                primary="야식행사 6시부터합니다~!"
                            />
                        </ListItem>
                    </Col>
                    <Col span={4}>
                        <Chip
                            className={classes.commentChip}
                            size="small"
                            icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                            label="188"
                        />
                    </Col>
                </Row>
            </List>
        </Card>
    );
}
