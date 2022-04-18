import React from "react";
// Components
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import PostForm from "../../components/content/forms/PostForm";

const PostEditScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    // Navigation Data
    const postData = navigation.getParam("data");

    return (
        <ScreenContainer>
            <Header
                title="Comment"
            />
            <PostForm
                data={postData}
                type="edit"
                {...props}
            />
        </ScreenContainer>
    );
};

export default PostEditScreen;

