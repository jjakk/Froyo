import React, { useState } from "react";
// Components
import { StyleSheet, View } from "react-native";
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { Button, OptionalInput } from "@froyo/elements";

const MeetupCreateScreen = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [lifetime, setLifetime] = useState("");

    const onSubmit = () => {
        // create meetup
    };

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
                    label="Add a Description"
                    placeholder="Description"
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
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
                    placeholder="24"
                    inputUnits="Hours"
                    style={styles.input}
                    value={lifetime}
                    onChangeText={setLifetime}
                />
                <Button
                    title="Create"
                    onPress={onSubmit}
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