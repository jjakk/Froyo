import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import PostForm from '../../components/content/forms/PostForm';

const PostCreateScreen = (props) => {
    const {
        navigation
    } = props;

    return (
        <ScreenContainer
        >
            <Header
                navigation={navigation}
            />
            <PostForm
                type='create'
                {...props}
            />
        </ScreenContainer>
    );
};

export default PostCreateScreen;

