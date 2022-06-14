import React from "react";
// Components
import { ScreenContainer, Headr } from "@froyo/fundamentals";
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

