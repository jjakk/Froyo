import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import { Context as PostContext } from '../../context/PostContext';
import { Button, Text, Input } from '../../components/froyo-elements';
import BackIcon from '../../../assets/icons/Back.svg';
import PlusIcon from '../../../assets/icons/Plus.svg';
import ErrorMessage from '../../components/ErrorMessage';

const PostCreateScreen = ({ navigation }) => {
    const [postBody, setPostBody] = useState('');
    const [loading, setLoading] = useState(false);
    const { createPost, clearErrorMessage, state: { errorMessage } } = useContext(PostContext);

    /*const handleUpload = async () => {
        // Get permission if not granted
        const permission = await MediaLibrary.getPermissionsAsync();
        if(!permission.granted){
            const response = await MediaLibrary.requestPermissionsAsync();
            if(response.granted){
                console.log('Permission Granted');
            }
            else{
                console.log('Permission Denied');
            }
        }
        // Request file if permission if granted
        if(permission.granted){
            const { uri } = await Camera.takePictureAsync();
            const asset = await MediaLibrary.createAssetAsync(uri);
            console.log(asset);
        }
    }*/

    const handleSubmit = async () => {
        clearErrorMessage();
        Keyboard.dismiss()
        setLoading(true);
        await createPost({ postBody }, (success) => {
            setLoading(false);
            if(success) navigation.navigate('Feed');
        });
    };

    // Delete error message when you type in the post body
    useEffect(() => {
        if(errorMessage) clearErrorMessage();
    }, [postBody]);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
            >
                <View>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Feed')}>
                        <BackIcon width={25} height={25} style={styles.back} />
                    </TouchableWithoutFeedback>
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
                    {/*
                    <TouchableOpacity onPress={handleUpload}>
                        <View style={styles.attachment}>
                            <PlusIcon width={40} height={40} color='#393939' />
                            <Text style={styles.attachmentText}>Add a photo or video</Text>
                        </View>
                    </TouchableOpacity>
                    */}
                    <Button
                        containerStyle={styles.submit}
                        type='primary'
                        title='Post'
                        color='#41CA99'
                        textColor='white'
                        loading={loading}
                        onPress={handleSubmit}
                    />
                    <ErrorMessage message={errorMessage} />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    back: {
        margin: 25,
        marginBottom: 10
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

