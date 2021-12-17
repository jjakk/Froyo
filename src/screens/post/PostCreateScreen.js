import React, { useState, useContext, useEffect } from 'react';
// Components
import {
    View,
    StyleSheet,
    Keyboard,
} from 'react-native';
import {
    Input,
} from '../../components/froyo-elements';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import ErrorMessage from '../../components/ErrorMessage';
// Constants
import { colors } from '../../constants/constants';
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
                navigation.pop();
            }
        });
    };

    // Delete error message when you type in the post body
    useEffect(() => {
        if(error) setError('');
    }, [postBody]);

    return (
        <ScreenContainer>
            <Header
                navigation={navigation}
                RightIcon={SendIcon}
                rightIconColor={colors.FROYO_GREEN}
                rightIconOnPress={handleSubmit}
                rightIconSize={30}
                leftIconSize={30}
            />
            <View style={styles.bodyContainer}>
                <Input
                    style={styles.body}
                    textStyle={styles.bodyText}
                    multiline={true}
                    placeholder='Type here...'
                    value={postBody}
                    onChangeText={setPostBody}
                />
            </View>
            <ErrorMessage message={error} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    // Inputs
    bodyContainer: {
        maxHeight: 300,
        width: 350,
        margin: 15
    },
    bodyText: {
        fontSize: 22
    },
    attachment: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#404040',
        margin: 15,
        padding: 25,
        borderRadius: 15,
        width: 350
    },
    attachmentText: {
        fontSize: 24,
        marginTop: 20,
        color: '#393939'
    },
    submit: {
        margin: 15,
        width: 350
    }
});

export default PostCreateScreen;

