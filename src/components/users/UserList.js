import React from "react";
// Components
import {
    StyleSheet,
    View
} from "react-native";
import { FlatList } from "../froyo-elements";
import EmptySign from "../EmptySign";
import LoadingAnimation from "../animations/LoadingAnimation";
import UserPreview from "./UserPreview";

const UserList = (props) => {

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
                        <EmptySign
                            subheaderText="No users found"
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
        justifyContent: "center",
    },
    noUsers: {
        marginTop: 50
    }
});

export default UserList;