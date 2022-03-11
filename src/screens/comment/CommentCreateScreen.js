import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import CommentForm from '../../components/content/forms/CommentForm';

const CommentEditScreen = (props) => {
    // Props
    const {
        navigation,
    } = props;

    const parentId = navigation.getParam('parentId');
    console.log(parentId);

    return (
        <ScreenContainer>
            <Header
                navigation={navigation}
                title='Comment'
            />
            <CommentForm
                data={{ parent_id: parentId }}
                {...props}
            />
        </ScreenContainer>
    );

};

export default CommentEditScreen;
