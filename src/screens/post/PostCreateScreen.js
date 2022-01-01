import React, { useState, useContext, useEffect } from 'react';
// Components
import {
    View,
    StyleSheet,
    Keyboard,
} from 'react-native';
import {
    Input,
    TouchableIcon
} from '../../components/froyo-elements';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import ErrorMessage from '../../components/ErrorMessage';
// Constants
import constants, { colors } from '../../constants/constants';
// Context
import { Context as PostContext } from '../../context/PostContext';
// Icons
import SendIcon from '../../../assets/icons/Send.svg';

const PostCreateScreen = ({ navigation }) => {
    const { createPost, clearErrorMessage, state: { errorMessage } } = useContext(PostContext);
    // Form feilds
    const [postBody, setPostBody] = useState('');
    // Status state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Event Handlers
    const handleSubmit = async () => {
        clearErrorMessage();
        Keyboard.dismiss()
        setLoading(true);
        await createPost({ postBody }, (err) => {
            setLoading(false);
            if (err) {
                setError(err);
            }
            else {
                navigation.navigate('Feed');
            }
        });
    };

    // Delete error message when you type in the post body
    useEffect(() => {
        if(error) setError('');
    }, [postBody]);

    return (
        <ScreenContainer style={styles.container}>
            <TouchableIcon
                Icon={SendIcon}
                color={colors.FROYO_GREEN}
                onPress={handleSubmit}
                size={30}
                style={styles.sendButton}
            />
            <Input
                style={styles.body}
                textStyle={styles.bodyText}
                multiline={true}
                placeholder='Type here...'
                value={postBody}
                onChangeText={setPostBody}
            />
            <ErrorMessage message={error} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 300,
        width: 350,
        margin: 15
    },
    sendButton: {
        alignSelf: 'flex-end',
        marginBottom: 25
    },
    bodyText: {
        fontSize: 22
    }
});

export default PostCreateScreen;

