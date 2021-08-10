import React from 'react';
import { ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Post from '../components/Post';

const FeedScreen = () => {
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
        </SafeAreaView>
    );
};

FeedScreen.navigationOptions = {
    headerShown: false
};

export default FeedScreen;

