import React from 'react';
import PostContentContainer from '../containers/PostContentContainer';

export default function PostContentPage({ match }) {
    const { id } = match.params;
    return (
        <>
            <PostContentContainer id={id} />
        </>
    );
}
