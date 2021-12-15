import React from 'react';
// Components
import {
    StyleSheet
} from 'react-native';
import {
    TouchableIcon
} from '../components/froyo-elements';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
// Icons
import CreatePostIcon from '../../assets/icons/CreatePost.svg';

const FeedScreen = ({ navigation }) => {
    const posts = [];

    // Event Handlers
    const onCreatePost = () => {
        navigation.navigate('PostCreate');
    }

    return (
        <ScreenContainer
            edges={['top']}
        >
            <PostList
                posts={posts}
                loading={false}
                emptyMessage='Follow people to populate your feed'
                onPostDelete={() => {}}
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
    createPost: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
});

export default FeedScreen;

