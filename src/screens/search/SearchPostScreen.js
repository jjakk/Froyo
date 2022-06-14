import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
// Components
import { PostList } from "@froyo/lists";
// Context
import { useContent } from "@froyo/content-context";
// Navigation
import { NavigationEvents } from "react-navigation";

const SearchPostScreen = (props) => {
    // Context
    const { searchContent } = useContent();

    // Props
    const {
        navigation
    } = props;

    // State
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Navigation params
    const query = navigation.getParam("searchQuery");

    const retreivePosts = async () => {
        try {
            setLoading(true);
            setResults(
                !query
                    ? []
                    : await searchContent("post", { text: query })
            );
        }
        catch(err) {
            Alert.alert(err.response.data);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        retreivePosts();
    }, [query]);

    return (
        <>
            <NavigationEvents
                onDidFocus={retreivePosts}
            />
            <PostList
                emptyMessage="No posts found"
                data={results}
                refreshable={false}
                loading={loading}
                onRefresh={retreivePosts}
            />
        </>
    );
};

export default SearchPostScreen;