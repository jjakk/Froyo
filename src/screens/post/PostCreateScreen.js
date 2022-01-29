import React, { useState, useEffect } from 'react';
// Components
import {
    View,
    StyleSheet,
    Keyboard,
} from 'react-native';
import {
    Input,
    TouchableIcon,
    ImageUpload
} from '../../components/froyo-elements';
import { NavigationEvents } from 'react-navigation';
import ScreenContainer from '../../components/ScreenContainer';
import ErrorMessage from '../../components/messages/ErrorMessage';
// Constants
import { colors } from '../../constants/constants';
// Context
import { useSettings } from '../../context/SettingsContext';
import { useContent } from '../../context/ContentContext';
// Icons
import SendIcon from '../../../assets/icons/Send.svg';

const PostCreateScreen = ({ navigation }) => {
    // Context
    const { state: { theme } } = useSettings();
    const { createContent } = useContent();
    const darkModeEnabled = theme === 'dark';

    // State
    const [postText, setPostText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);

    // Event Handlers
    const handleSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            await createContent('post', { text: postText });
            setLoading(false);
            setPostText('');
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
    }, [postText]);

    return (
        <ScreenContainer style={styles.container}>
            <NavigationEvents onDidFocus={clearError}/>
            <View style={styles.body}>
                <Input
                    style={[
                        styles.textbox
                    ]}
                    multiline={true}
                    placeholder='Type here...'
                    value={postText}
                    onChangeText={setPostText}
                />
                <TouchableIcon
                    Icon={SendIcon}
                    color={darkModeEnabled ? colors.light.THIRD : colors.GREEN}
                    onPress={handleSubmit}
                    size={30}
                    loading={loading}
                    style={styles.submit}
                />
            </View>
            <ImageUpload
                style={styles.imageUpload}
                onUpload={setImage}
            />
            <ErrorMessage message={error} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbox: {
        fontSize: 22,
        flex: 1,
    },
    imageUpload: {
        marginTop: 25,
    },
    submit: {
        marginLeft: 20,
    }
});

export default PostCreateScreen;

