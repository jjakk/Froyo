import React from 'react';
// Components
import {
    StyleSheet
} from 'react-native';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
// Icons
import GuestIcon from '../../assets/icons/Profile-Picture.svg'
// Constants
import { colors } from '../constants/constants';

const FeedScreen = ({ navigation }) => {
    const posts = [];
    
    // Event handlers
    const onAccountView = () => {
        navigation.navigate('AccountView');
    };

    return (
        <ScreenContainer
            edges={['top']}
        >
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
                loading={false}
                emptyMessage='Follow people to populate your feed'
                onPostDelete={() => {}}
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

