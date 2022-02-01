import React, { useState, useEffect } from 'react';
// Components
import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { LoadingAnimation } from '../froyo-elements';
import { NavigationEvents } from 'react-navigation';
// Context
import { useSettings } from '../../context/SettingsContext';
import { useUser } from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
// Constants
import { colors } from '../../constants/constants';

const ContentList = (props) => {
    // Context
    const { state: { theme } } = useSettings();
    const {
        getComments,
        searchContent,
        getFeed
    } = useContent();
    const { state: { user: signedInUser } } = useUser();
    const darkModeEnabled = theme === 'dark';

    // Props
    const {
        contentType,
        parent,
        style,
        onPullDownRefresh,
        RenderComponent,
        HeaderComponent,
        refreshable=true,
        ...otherProps
    } = props;
    const parentType = parent.parent_id ? 'comment' : 'post';

    // State
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState([]);

    // Content refreshing
    const onRefresh = async () => {
        setRefreshing(true);
        if (onPullDownRefresh) await onPullDownRefresh();
        setRefreshing(false);
    }

    const onDidFocus = async () => {
        await onPullDownRefresh();
    };

    // Comment refresh logic
    useEffect(() => {
        (async function(){
            setLoading(true);
            setContents(await getComments(parentType, parent.id));
            setLoading(false);
        })();
    }, [parent]);

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container,
            style
        ]}>
            <NavigationEvents onDidFocus={onDidFocus} />
            <FlatList
                data={loading ? [] : contents}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={HeaderComponent}
                showsVerticalScrollIndicator={false}
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
                    <RenderComponent
                        data={item}
                        onDelete={onPullDownRefresh}
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
        flex: 1,
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default ContentList;