import React from 'react';
import { useStyles } from '../styles/boardMain.style';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Link } from 'react-router-dom';
// import ForumIcon from '@material-ui/icons/Forum';
// import StarsIcon from '@material-ui/icons/Stars';
// import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
// import StorageIcon from '@material-ui/icons/Storage';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { Chip, Divider, Card, List, ListItem, ListItemText } from '@material-ui/core';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

export default function BoardMainContainer({ data }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Row justify="center" align="center">
                <Col span={22}>
                    <Chip
                        className={classes.titleChipStyle}
                        icon={<VolumeUpIcon className={classes.iconColor} />}
                        label={data.boardName}
                    />
                </Col>
                <Col span={2}>
                    <Link>
                        <AddCircleOutlineSharpIcon className={classes.addIcon} />
                    </Link>
                </Col>
            </Row>
            <Divider />
            <List>
                {data.posts.map((post, idx) => (
                    <Row key={idx} justify="center" align="center">
                        <Col span={20}>
                            <ListItem classes={{ root: classes.listItem }} button>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
                                    primary={post.title}
                                />
                            </ListItem>
                        </Col>
                        <Col span={4}>
                            <Chip
                                className={classes.commentChip}
                                size="small"
                                icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                                label={post.likeCount}
                            />
                        </Col>
                    </Row>
                ))}
            </List>
        </Card>
    );
}
