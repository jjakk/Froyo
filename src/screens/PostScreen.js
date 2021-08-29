import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Button, Text, Input } from '../components/froyo-elements';
import BackIcon from '../../assets/icons/Back.svg';
import PlusIcon from '../../assets/icons/Plus.svg';

const PostScreen = ({ navigation }) => {
    const handleUpload = async () => {
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
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.postHeader}>Post</Text>
            <View style={styles.bodyContainer}>
                <Input
                    style={styles.body}
                    textStyle={styles.bodyText}
                    multiline={true}
                    placeholder='Type here...'
                />
            </View>
            <TouchableOpacity onPress={handleUpload}>
                <View style={styles.attachment}>
                    <PlusIcon width={40} height={40} color='#393939' />
                    <Text style={styles.attachmentText}>Add a photo or video</Text>
                </View>
            </TouchableOpacity>
            <Button
                buttonStyle={styles.submit}
                type='primary'
                title='Post'
                color='#41CA99'
                textColor='white'
            />
            <TouchableNativeFeedback onPress={() => navigation.navigate('Feed')}>
                <BackIcon width={25} height={25} style={styles.back} />
            </TouchableNativeFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 20,
        left: 20,
    },
    postHeader: {
        fontSize: 32,
        fontFamily: 'Nunito-SemiBold',
        textAlign: 'center',
        margin: 5
    },
    // Inputs
    bodyContainer: {
        maxHeight: 300,
        width: 350,
        margin: 15,
    },
    body: {
        borderColor: '#cccccc',
    },
    bodyText: {
        fontSize: 22
    },
    attachment: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
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

export default PostScreen;

