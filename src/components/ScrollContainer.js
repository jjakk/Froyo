import React from 'react';
import {
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from 'react-native';

const ScrollContainer = (props) => {
    const {
        children,
        refreshing,
        onRefresh,
        fullyScrollable,
        refreshable
    } = props;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                refreshable ? (
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                ) : null
            }
            contentContainerStyle={styles.scrollviewContainer}
        >
            {
                fullyScrollable ? (
                    <TouchableWithoutFeedback>
                        <View>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                ) : (
                    children
                )
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollviewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

ScrollContainer.defaultProps = {
    fullyScrollable: true,
    refreshable: true
};

export default ScrollContainer;