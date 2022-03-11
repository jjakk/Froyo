import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import CommentForm from '../../components/content/forms/CommentForm';

const CommentEditScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    // Navigation Data
    const commentData = navigation.getParam('data');

    return (
        <ScreenContainer>
            <Header
                navigation={navigation}
                title='Comment'
            />
            <CommentForm
                data={commentData}
                {...props}
            />
        </ScreenContainer>
    );

};

export default CommentEditScreen;
