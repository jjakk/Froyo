import React from "react";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { CommentForm } from "@froyo/forms";

const CommentEditScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    // Navigation Data
    const commentData = navigation.getParam("data");

    return (
        <ScreenContainer>
            <Header
                title="Comment"
            />
            <CommentForm
                data={commentData}
                {...props}
            />
        </ScreenContainer>
    );

};

export default CommentEditScreen;
