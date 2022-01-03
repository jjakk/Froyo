import React, { useState, useContext } from 'react';
// Components
import {
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
import ErrorMessage from '../components/ErrorMessage';
// Context
import { Context as PostContext } from '../context/PostContext';
// Icons
import GuestIcon from '../../assets/icons/Profile-Picture.svg'
// Constants
import { colors } from '../constants/constants';

const FeedScreen = ({ navigation }) => {
    const { getFeed } = useContext(PostContext);
    // Status states
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    // Error handling
    const clearError = () => {
        setError('');
    };

    // Function to retrieve user info & posts
    const reloadContent = async () => {
        setLoading(true);
        // Retrieve posts
        setPosts(await getFeed());
        setLoading(false);
    };
    
    // Event handlers
    const onAccountView = () => {
        navigation.navigate('AccountView');
    };

    const onDidFocus = async () => {
        await reloadContent();
    };

    return (
        <ScreenContainer
            edges={['top']}
        >
            <NavigationEvents onDidFocus={onDidFocus}/>
            <Header
                navigation={navigation}
                LeftIcon={GuestIcon}
                LeftIconProps={{
                    size: 50,
                    onPress: onAccountView
                }}
                style={styles.header}
            />
            <PostList
                posts={posts}
                loading={loading}
                emptyMessage='Follow people to populate your feed'
                onPostDelete={reloadContent}
                onError={setError}
            />
            <ErrorMessage
                type='box'
                message={error}
                clearError={clearError}
                style={styles.error}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderBottomColor: colors.GREY,
        borderBottomWidth: 1,
    }
});

export default FeedScreen;

