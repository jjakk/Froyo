import React from "react";
// Components
import { StyleSheet, View } from "react-native";
import { FlatList } from "@froyo/elements";
import Meetup from "./Meetup";

const MeetupList = (props) => {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                RenderComponent={Meetup}
                {...props}
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