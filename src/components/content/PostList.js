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
// Constants
import { colors } from '../../constants/constants';

const PostList = (props, ref) => {
    // Refs
    const scrollRef = useRef();

    // Context
    const { state: { user: signedInUser } } = useUser();

    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === 'dark' ;

    // Props
    const {
        data: posts,
        loading,
        emptyMessage,
        style,
        onRefresh,
        user=signedInUser,
        refreshable=true,
        ...otherProps
    } = props;

    // State
    const [refreshing, setRefreshing] = useState(false);

    // Reference
    useImperativeHandle(ref, () => ({
        reloadContent: async () => {
            await onRefresh()
        },
        scrollToTop: () => {
            scrollRef.current.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }
    }))

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container,
            style
        ]}>
            <NavigationEvents onDidFocus={onRefresh} />
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
                            onRefresh={async () => {
                                setRefreshing(true);
                                await onRefresh();
                                setRefreshing(false);
                            }}
                        />
                    ) : null
                }
                renderItem={({ item }) => (
                    <Post
                        data={item}
                        onDelete={onRefresh}
                    />
                )}
                ListEmptyComponent={() => (
                    loading ? (
                        <LoadingAnimation
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
