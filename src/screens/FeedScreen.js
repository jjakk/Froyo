import React, { useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../components/Post';
import EmptyMessage from '../components/EmptyMessage';
import CreatePostIcon from '../../assets/icons/CreatePost.svg';

const FeedScreen = ({ navigation }) => {
    const dummyPosts = [
        /*{
            id: 'fj2fhj2ihf923fih23f0',
            author: 'Jak Moden',
            age: '3d',
            text: 'This is my first post'
        },
        {
            id: '20kjf2i3h239fh928fh92ioh2f82h',
            author: 'Dogecoin Millionare',
            age: '1hr',
            text: 'Dogecoin to the mooooon!'
        },
        {
            id: 'foijwifj2oh3f8h2938fh2',
            author: 'Rick Astley',
            age: '4y',
            text: `Never gonna give you up.
Never gonna let you down.
Never gonna run around and desert you.
Never gonna make you cry.
Never gonna say goodbye. Never gonna tell a lie and hurt you`
        }*/
    ];

    useEffect(() => {
        // Get posts from server
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                dummyPosts.length !== 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={dummyPosts}
                        style={styles.postList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Post
                                    author={item.author}
                                    age={item.age}
                                    text={item.text}
                                />
                            );
                        }}
                    />
                )
                : (
                    <EmptyMessage
                        style={styles.emptyMessage}
                        subheaderText="Follow people to populate your feed"
                    />
                )
            }
            <TouchableOpacity
                onPress={() => navigation.navigate('PostCreate')}
                style={styles.createPost}
            >
                <CreatePostIcon width={50} height={50}/>
            </TouchableOpacity>
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
        right: 20,
    },
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postList: {
        flex: 1,
        flexDirection: 'column',
    },
    emptyMessage: {
        marginBottom: 100,
    }
});

export default FeedScreen;

