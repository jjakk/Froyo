import React, { useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { TouchableIcon } from '../components/froyo-elements';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
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

    // Event Handlers
    const onCreatePost = () => {
        navigation.navigate('PostCreate');
    }

    useEffect(() => {
        // Get posts from server
    }, []);

    return (
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <PostList
                posts={dummyPosts}
                loading={false}
                emptyMessage='Follow people to populate your feed'
                onPostDelete={() => {}}
                style={styles.postList}
            />
            <TouchableIcon
                Icon={CreatePostIcon}
                size={50}
                style={styles.createPost}
                onPress={onCreatePost}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createPost: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    postList: {
        flexDirection: 'column',
        backgroundColor: 'orange'
    }
});

export default FeedScreen;

