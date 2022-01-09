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
import { NavigationEvents } from 'react-navigation';
import ScreenContainer from '../../components/ScreenContainer';
import ErrorMessage from '../../components/ErrorMessage';
// Constants
import constants, { colors } from '../../constants/constants';
// Context
import { Context as PostContext } from '../../context/PostContext';
// Icons
import SendIcon from '../../../assets/icons/Send.svg';

const PostCreateScreen = ({ navigation }) => {
    const { createPost } = useContext(PostContext);
    // Form feilds
    const [postBody, setPostBody] = useState('');
    // Status state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Event Handlers
    const handleSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            await createPost({ postBody });
            setLoading(false);
            setPostBody('');
            navigation.navigate('AccountView');
        }
        catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const clearError = async () => {
        if(error) setError('');
    };

    // Delete error message when you type in the post body
    useEffect(() => {
        clearError();
    }, [postBody]);

    return (
        <ScreenContainer style={styles.container}>
            <NavigationEvents onDidFocus={clearError}/>
            <View style={styles.body}>
                <Input
                    style={styles.bodyText}
                    multiline={true}
                    placeholder='Type here...'
                    value={postBody}
                    onChangeText={setPostBody}
                />
                <TouchableIcon
                    Icon={SendIcon}
                    color={colors.FROYO_GREEN}
                    onPress={handleSubmit}
                    size={30}
                    loading={loading}
                    style={styles.sendButton}
                />
            </View>
            <ErrorMessage message={error} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        marginLeft: 20,
    },
    bodyText: {
        fontSize: 22,
        flex: 1,
    }
});

export default PostCreateScreen;

