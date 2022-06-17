import React from "react";
// Components
import { Appearance, StyleSheet, View } from "react-native";
import { FlatList } from "@froyo/elements";
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
                RenderComponent={Meetup}
                emptyMessage={emptyMessage}
                loading={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    meetupsLoading: {
        alignSelf: "center",
        marginTop: 50
    }
});

export default MeetupList;