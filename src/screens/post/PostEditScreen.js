import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import PostForm from '../../components/content/forms/PostForm';

const PostEditScreen = (props) => {
    const postData = props.navigation.getParam('data');

    return (
        <ScreenContainer>
            <PostForm
                data={postData}
                type='edit'
                {...props}
            />
        </ScreenContainer>
    );
};

export default PostEditScreen;

