import React from 'react';
import 'antd/dist/antd.css';
import BoardContentContainer from '../containers/BoardContentContainer';
import CommentContainer from '../containers/CommentContainer';

export default function PostContent() {
    return (
        <>
            <BoardContentContainer />
            <CommentContainer />
        </>
    );
}
