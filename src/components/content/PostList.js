// This componet takes in a list of posts and renders them
import React, {
    useState,
    useContext,
    useEffect,
    useImperativeHandle,
    forwardRef
} from 'react';
// Components
import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { LoadingAnimation } from '../froyo-elements';
import EmptyMessage from '../messages/EmptyMessage';
import Post from './Post';
// Context
import { Context as UserContext } from '../../context/UserContext';
import { Context as ContentContext } from '../../context/ContentContext';
// Constants
import { colors } from '../../constants/constants';

const PostList = (props, ref) => {
    // Context
    const { state: { user: signedInUser } } = useContext(UserContext);
    const {
        searchContent,
        getFeed
    } = useContext(ContentContext);

    // Props
    const {
        type,
        emptyMessage,
        style,
        user=signedInUser,
        refreshable=true,
        onPullDownRefresh,
        HeaderComponent
    } = props;

    // State
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    // Reference
    useImperativeHandle(ref, () => ({
        reloadContent: reloadContent
    }))

    // Function to retrieve user info & posts
    const reloadContent = async (searchValue='') => {
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
                setPosts(await searchContent('post', { text: searchValue }));
                break;
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await reloadContent(true);
        if (onPullDownRefresh) await onPullDownRefresh();
        setRefreshing(false);
    };

    useEffect(() => {
        (async function(){
            await reloadContent();
        })()
    }, []);

    return (
        <View style={[styles.container, style]}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={HeaderComponent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    refreshable ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    ) : null
                }
                renderItem={({ item }) => (
                    <Post
                        post={item}
                        onDelete={reloadContent}
                        clickable
                    />
                )}
                ListEmptyComponent={() => (
                    <>
                    {
                        loading ? (
                            <>
                            {
                                <LoadingAnimation
                                    size={50}
                                    style={styles.postLoading}
                                />
                            }
                            </>
                        ) : (
                            <EmptyMessage
                                style={styles.emptyMessage}
                                subheaderText={emptyMessage}
                            />
                        )
                    }
                    </>
                )}
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
    posts: {
        paddingTop: 5,
        flex: 1,
        backgroundColor: colors.LIGHT_GREY,
        width: '100%'
    },
    emptyMessage: {
        marginTop: 50
    },
    postLoading: {
        alignSelf: 'center',
        marginTop: 50
    }
});

export default forwardRef(PostList);
