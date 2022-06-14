import React from "react";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { CommentForm } from "@froyo/forms";

const CommentEditScreen = (props) => {
    // Props
    const {
        navigation,
    } = props;

    const parentId = navigation.getParam("parentId");

    return (
        <ScreenContainer>
            <Header
                title="Comment"
            />
            <CommentForm
                data={{ parent_id: parentId }}
                {...props}
            />
        </ScreenContainer>
    );

};

export default CommentEditScreen;
