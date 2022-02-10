import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import PostForm from '../../components/content/forms/PostForm';

const PostCreateScreen = (props) => {

    return (
        <ScreenContainer
            edges={['top']}
        >
            <PostForm
                {...props}
            />
        </ScreenContainer>
    );
};

export default PostCreateScreen;

