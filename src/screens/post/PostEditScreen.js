import React from "react";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { PostForm } from "@froyo/forms";

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
                title="Edit Post"
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

