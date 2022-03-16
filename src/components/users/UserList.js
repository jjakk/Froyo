import React from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    FlatList,
    View
} from 'react-native';
import EmptyMessage from '../messages/EmptyMessage';
import LoadingAnimation from '../animations/LoadingAnimation';
import UserPreview from './UserPreview';
// Constants
import { colors } from '../../constants/constants';

const UserList = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        users,
        style,
        loading
    } = props;

    return (
        <View
            style={[
                styles.container,
                themeStyles[theme].container,
                style
            ]}
        >
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <UserPreview user={item} />
                )}
                ListEmptyComponent={() => (
                    loading ? (
                        <LoadingAnimation
                            style={styles.noUsers}
                        />
                    ) : (
                        <EmptyMessage
                            subheaderText='No users found'
                            style={styles.noUsers}
                        />
                    )
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    noUsers: {
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

export default UserList;