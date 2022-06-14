import React from "react";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { PostForm } from "@froyo/forms";

const PostCreateScreen = (props) => {
    const {
        navigation
    } = props;

    return (
        <ScreenContainer
        >
            <Header
                title="Post"
            />
            <PostForm
                type="create"
                {...props}
            />
        </ScreenContainer>
    );
};

export default PostCreateScreen;

