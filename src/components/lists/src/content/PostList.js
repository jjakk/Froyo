// This componet takes in a list of posts and renders them
import React, {
    useRef,
    useImperativeHandle,
    forwardRef
} from "react";
// Components
import {
    Appearance,
    StyleSheet,
    View
} from "react-native";
import { FlatList } from "@froyo/elements";
import Post from "../content/Post";
// Context
import { useUser } from "@froyo/user-context";
// Constants
import { colors } from "@froyo/constants";

const PostList = (props, ref) => {
    // Refs
    const scrollRef = useRef();

    // Context
    const { state: { user: signedInUser } } = useUser();

    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        data: posts,
        loading,
        emptyMessage,
        style,
        user=signedInUser,
        refreshable=true,
        onRefresh,
        ...otherProps
    } = props;

    // Reference
    useImperativeHandle(ref, () => ({
        reloadContent: async () => {
            await onRefresh();
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
            <FlatList
                data={posts}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                renderItem={({ item }) => (
                    <Post
                        data={item}
                        onDelete={onRefresh}
                    />
                )}
                refreshable={refreshable}
                onRefresh={onRefresh}
                emptyMessage={emptyMessage}
                loading={loading}
                ref={scrollRef}
                {...otherProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        flex: 1
    },
    postLoading: {
        alignSelf: "center",
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
