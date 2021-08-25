import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, StatusBar, TouchableNativeFeedback } from 'react-native';
import Post from '../components/Post';
import CreatePostIcon from '../../assets/icons/CreatePost.svg';

const FeedScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#F2F2F2' barStyle='dark-content' />
            <ScrollView>
                <Post
                    author='Jak Moden'
                    age='3d'
                    text='This is my first post'
                />
                <Post
                    author='Rick Astley'
                    age='4y'
                    text='Never gonna give you up
                    Never gonna let you down
                    Never gonna run around and desert you
                    Never gonna make you cry
                    Never gonna say goodbye
                    Never gonna tell a lie and hurt you'
                />
                <Post
                    author='Rick Astley'
                    age='4y'
                    text='Never gonna give you up
                    Never gonna let you down
                    Never gonna run around and desert you
                    Never gonna make you cry
                    Never gonna say goodbye
                    Never gonna tell a lie and hurt you'
                />
                <Post
                    author='Rick Astley'
                    age='4y'
                    text='Never gonna give you up
                    Never gonna let you down
                    Never gonna run around and desert you
                    Never gonna make you cry
                    Never gonna say goodbye
                    Never gonna tell a lie and hurt you'
                />
                <Post
                    author='Rick Astley'
                    age='4y'
                    text='Never gonna give you up
                    Never gonna let you down
                    Never gonna run around and desert you
                    Never gonna make you cry
                    Never gonna say goodbye
                    Never gonna tell a lie and hurt you'
                />
            </ScrollView>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Post')}>
                <CreatePostIcon width={50} height={50} style={styles.createPost} />
            </TouchableNativeFeedback>
        </SafeAreaView>
    );
};

FeedScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    createPost: {
        position: 'absolute',
        bottom: 20,
        right: 20
    }
});

export default FeedScreen;

