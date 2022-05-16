import React, { useState } from "react";
// Components
import { StyleSheet, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import {
    Button,
    OptionalInput,
} from "../../components/froyo-elements";
import { useMeetups } from "../../context/MeetupContext";

const MeetupCreateScreen = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [lifetime, setLifetime] = useState("");

    return (
        <ScreenContainer>
            <Header
                title="Create Meetup"
            />
            <View style={styles.form}>
                <OptionalInput
                    label="Add a Title"
                    placeholder="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
                <OptionalInput
                    label="Add a Location"
                    placeholder="Location"
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                />
                <OptionalInput
                    label="Set Lifetime"
                    placeholder="12"
                    inputUnits="Hours"
                    style={styles.input}
                    value={lifetime}
                    onChangeText={setLifetime}
                />
                <Button
                    title="Create"
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    form: {
        padding: 20,
    },
    input: {
        marginBottom: 20
    }
});

export default MeetupCreateScreen;