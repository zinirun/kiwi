import React from 'react';
import 'antd/dist/antd.css';
import PostContentContainer from '../containers/PostContentContainer';
import CommentContainer from '../containers/CommentContainer';

export default function PostContentPage({ match }) {
    const { id } = match.params;
    return (
        <>
            <PostContentContainer id={id} />
            <CommentContainer id={id} />
        </>
    );
}
