import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { Text } from '../components/froyo-elements';
import Post from '../components/Post';

const FeedScreen = () => {
    return (
        <View>
            <Post
                author='Jak'
                age='3d'
                text='This is my first post'
            />
        </View>
    );
};

export default FeedScreen;

