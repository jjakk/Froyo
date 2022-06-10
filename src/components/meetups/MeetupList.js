import React from "react";
// Components
import { Appearance, StyleSheet, View } from "react-native";
import { FlatList } from "../froyo-elements";
import LoadingAnimation from "../animations/LoadingAnimation";
import EmptySign from "../EmptySign";
import Meetup from "./Meetup";

const MeetupList = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        loading,
        data: meetups,
        emptyMessage
    } = props;

    return (
        <View style={styles.container}>
            <FlatList
                data={meetups}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Meetup
                        data={item}
                    />
                )}
                ListEmptyComponent={() => (
                    loading ? (
                        <LoadingAnimation
                            size={50}
                            style={styles.meetupsLoading}
                        />
                    ) : (
                        <EmptySign
                            style={styles.emptyMessage}
                            subheaderText={emptyMessage}
                        />
                    )
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyMessage: {
        alignSelf: "center",
        marginTop: 35,
        width: 300
    },
    meetupsLoading: {
        alignSelf: "center",
        marginTop: 50
    }
});

export default MeetupList;