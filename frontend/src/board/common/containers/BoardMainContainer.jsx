import React from 'react';
import { useStyles } from '../styles/boardMain.style';
import { Link } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Chip, Divider, Card, List, ListItem, ListItemText } from '@material-ui/core';
import { Row, Col } from 'antd';
import { IconViewer } from '../../../header/components/IconViewer';

export default function BoardMainContainer({ data, noLink }) {
    const classes = useStyles();
    return (
        <Card className={classes.paper}>
            <div>
                <Chip
                    component={noLink ? 'span' : Link}
                    to={noLink ? `` : `/board/${data.boardLink}`}
                    className={noLink ? classes.bestChip : classes.titleChip}
                    icon={<IconViewer icon={data.boardIcon} classes={classes.iconColor} />}
                    label={data.boardName}
                />
            </div>
            <Divider />
            <List>
                {data.posts.map((post, idx) => (
                    <Link key={idx} className={classes.postLink} to={`/post/${post.id}`}>
                        <Row>
                            <Col span={20}>
                                <ListItem classes={{ root: classes.listItem }}>
                                    <ListItemText
                                        classes={{ primary: classes.listItemText }}
                                        primary={post.title}
                                    />
                                </ListItem>
                            </Col>
                            <Col span={4} align="right">
                                <Chip
                                    className={classes.commentChip}
                                    size="small"
                                    icon={<ThumbUpOutlinedIcon className={classes.upIcon} />}
                                    label={post.likeCount}
                                />
                            </Col>
                        </Row>
                    </Link>
                ))}
            </List>
        </Card>
    );
}
