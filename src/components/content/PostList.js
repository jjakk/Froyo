// This componet takes in a list of posts and renders them
import React, {
    useState,
    useRef,
    useImperativeHandle,
    forwardRef
} from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import LoadingAnimation from '../animations/LoadingAnimation';
import EmptyMessage from '../messages/EmptyMessage';
import Post from './Post';
// Context
import { useUser } from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
// Constants
import { colors } from '../../constants/constants';

const PostList = (props, ref) => {
    // Refs
    const scrollRef = useRef();

    // Context
    const { state: { user: signedInUser } } = useUser();
    const {
        searchContent,
        getFeed
    } = useContent();

    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === 'dark' ;

    // Props
    const {
        type,
        emptyMessage,
        style,
        onPullDownRefresh,
        onDelete,
        user=signedInUser,
        refreshable=true,
        ...otherProps
    } = props;

    // State
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    // Reference
    useImperativeHandle(ref, () => ({
        reloadContent: async (searchValue) => {
            await reloadContent(searchValue)
        },
        scrollToTop: () => {
            scrollRef.current.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }
    }))

    // Function to retrieve user info & posts
    const reloadContent = async (searchValue) => {
        setLoading(true);
        // Retrieve posts
        switch (type) {
            case 'AccountView':
                setPosts(await searchContent('post', { author_id: user.id }));
                break;
            case 'Feed':
                setPosts(await getFeed());
                break;
            case 'Search':
                if(searchValue !== undefined) {
                    setPosts(await searchContent('post', { text: searchValue }));
                }
                break;
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await reloadContent();
        if (onPullDownRefresh) await onPullDownRefresh();
        setRefreshing(false);
    };

    const onDidFocus = async () => {
        reloadContent();
    };

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container,
            style
        ]}>
            <NavigationEvents onDidFocus={onDidFocus} />
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                refreshControl={
                    refreshable ? (
                        <RefreshControl
                            tintColor={colors.GREEN}
                            colors={[colors.GREEN]}
                            progressBackgroundColor={darkModeEnabled ? colors.light.FOURTH : colors.WHITE}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    ) : null
                }
                renderItem={({ item }) => (
                    <Post
                        data={item}
                        onDelete={onDelete || reloadContent}
                    />
                )}
                ListEmptyComponent={() => (
                    loading ? (
                        <LoadingAnimation
                            size={50}
                            style={styles.postLoading}
                        />
                    ) : (
                        <EmptyMessage
                            style={styles.emptyMessage}
                            subheaderText={emptyMessage}
                        />
                    )
                )}
                ref={scrollRef}
                {...otherProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        flex: 1
    },
    emptyMessage: {
        marginTop: 50
    },
    postLoading: {
        alignSelf: 'center',
        marginTop: 50
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST,
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FOURTH,
        }
    })
};

export default forwardRef(PostList);
