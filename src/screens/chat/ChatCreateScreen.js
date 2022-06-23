import React, { useState } from "react";
// Components
import { Alert } from "react-native";
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { ChatForm } from "@froyo/forms";
// Context
import { useChat } from "@froyo/chat-context"

const ChatCreateScreen = ({ navigation }) => {
    const { createChat } = useChat();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try{
            setLoading(true);
            await createChat(data);
            navigation.goBack();
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <ScreenContainer>
            <Header
                title="Create"
            />
            <ChatForm
                onSubmit={onSubmit}
                loading={loading}
            />
        </ScreenContainer>
    );
};

export default ChatCreateScreen;