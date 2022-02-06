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
import ImageUpload from '../../components/ImageUpload';
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
    const [images, setImages] = useState([]);

    // Event Handlers
    const handleSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            await createContent('post', { text: postText, images });
            setLoading(false);
            // Clear form data
            setPostText('');
            setImages([]);
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

    // Image events
    const onImageSelect = (image) => {
        setImages([...images, image]);
    }

    const onImageDelete = (index) => {
        setImages([
            ...images.slice(0, index),
            ...images.slice(index + 1)
        ]);
    };


    // Delete error message when you type in the post body
    useEffect(() => {
        clearError();
    }, [postText]);

    return (
        <ScreenContainer
            edges={['top']}
        >
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
                images={images}
                onImageSelect={onImageSelect}
                onDelete={onImageDelete}
            />
            <ErrorMessage
                message={error}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    body: {
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Text input
    textbox: {
        fontSize: 22,
        flex: 1,
        maxHeight: 250,
    },
    // Image upload
    imageUpload: {
        paddingRight: 25,
        paddingLeft: 25
    },
    submit: {
        marginLeft: 20,
    }
});

export default PostCreateScreen;

