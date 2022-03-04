import React, { useState, useEffect } from 'react';
// Components
import {
    StyleSheet,
    Keyboard,
    View
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {
    Input,
    TouchableIcon
} from '../../froyo-elements';
import ErrorMessage from '../../messages/ErrorMessage';
import ImageUpload from '../../ImageUpload';
// Constants
import { BASE_URL, colors } from '../../../constants/constants';
// Icons
import SendIcon from '../../../../assets/icons/Send.svg';
// Context
import { useSettings } from '../../../context/SettingsContext';
import { useContent } from '../../../context/ContentContext';

const PostForm = (props) => {
    // Context
    const { state: { theme } } = useSettings();
    const { createContent } = useContent();
    const darkModeEnabled = theme === 'dark';

    // Props
    const {
        navigation,
        data: {
            text: passedText,
            images: unformatedPassedImages
        },
        type
    } = props;
    const passedImages = unformatedPassedImages
        ? unformatedPassedImages.map(img => `${BASE_URL}/images/${img}`)
        : null

    // State
    const [text, setText] = useState(passedText || '');
    const [images, setImages] = useState(passedImages || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Event Handlers
    const handleSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            switch(type){
                case 'create':
                    await createContent('post', { text, images });
                    break;
                case 'edit':
                    await updateContent('post', { text, images });
                    break;
            }  
            // Clear form data
            setText('');
            setImages([]);
            navigation.navigate('AccountView');
        }
        catch (err) {
            setError(err.message);
        }
        finally {
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
    }, [text]);

    return (
        <View style={styles.container}>
            <NavigationEvents onDidFocus={clearError}/>
            <View style={styles.body}>
                <Input
                    style={[
                        styles.textbox
                    ]}
                    multiline={true}
                    placeholder='Type here...'
                    value={text}
                    onChangeText={setText}
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
                type='box'
                style={styles.error}
                message={error}
                clearError={clearError}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
        flex: 1,
        paddingRight: 25,
        paddingLeft: 25
    },
    submit: {
        marginLeft: 20,
    },
    error: {
        bottom: 25
    }
});

PostForm.defaultProps = {
    data: {
        text: null,
        images: null
    }
};

export default PostForm;