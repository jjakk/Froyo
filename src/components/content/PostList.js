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
import EmptyMessage from '../EmptyMessage';
import Post from './Post';
// Context
import { Context as UserContext } from '../../context/UserContext';
import { Context as PostContext } from '../../context/PostContext';
// Constants
import { colors } from '../../constants/constants';

const PostList = (props, ref) => {
    // Context
    const { getUser, state: { user: signedInUser } } = useContext(UserContext);
    const {
        searchPosts,
        getFeed
    } = useContext(PostContext);

    // Props
    const {
        user: passedUser,
        type,
        emptyMessage,
        style,
        onPullDownRefresh,
        HeaderComponent
    } = props;

    // State
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const user = passedUser || signedInUser;

    // Reference
    useImperativeHandle(ref, () => ({
        search: async (searchValue) => {
            await reloadContent(searchValue)
        }
    }))

    // Function to retrieve user info & posts
    const reloadContent = async (searchValue='') => {
        setLoading(true);
        // Retrieve posts
        switch (type) {
            case 'AccountView':
                setPosts(await searchPosts({ author_id: user.id }));
                break;
            case 'Feed':
                setPosts(await getFeed());
                break;
            case 'Search':
                setPosts(await searchPosts({ text: searchValue }));
                break;
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await reloadContent(true);
        await onPullDownRefresh();
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
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
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
