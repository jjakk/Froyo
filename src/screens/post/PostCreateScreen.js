import React, { useState, useEffect } from 'react';
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
import ErrorMessage from '../../components/messages/ErrorMessage';
// Constants
import { colors } from '../../constants/constants';
// Context
import { useSettings } from '../../context/SettingsContext';
import { useContent } from '../../context/ContentContext';
// Icons
import SendIcon from '../../../assets/icons/Send.svg';

const PostCreateScreen = ({ navigation }) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';
    const { createContent } = useContent();
    // Form feilds
    const [postText, setPostText] = useState('');
    // Status state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
                        styles.textbox,
                        themeStyles[theme].textbox
                    ]}
                    textStyle={
                        themeStyles[theme].text
                    }
                    placeholderTextColor={darkModeEnabled ? colors.LIGHT_GREY : colors.GREY}
                    multiline={true}
                    placeholder='Type here...'
                    value={postText}
                    onChangeText={setPostText}
                />
                <TouchableIcon
                    Icon={SendIcon}
                    color={darkModeEnabled ? colors.GREEN_LIGHTER : colors.GREEN}
                    onPress={handleSubmit}
                    size={30}
                    loading={loading}
                    style={styles.submit}
                />
            </View>
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
    submit: {
        marginLeft: 20,
    }
});

const themeStyles = {
    light: StyleSheet.create({
        textbox: {
            color: colors.LIGHT_DARK
        }
    }),
    dark: StyleSheet.create({
        textbox: {
            borderColor: colors.dark.FIRST,
            backgroundColor: colors.dark.SECOND
        },
        text: {
            color: colors.WHITE
        }
    })
};

export default PostCreateScreen;

