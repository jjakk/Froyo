import React, { useState } from "react";
// Components
import { StyleSheet, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import {
    Button,
    OptionalInput,
    DatePicker
} from "../../components/froyo-elements";

const MeetupCreateScreen = () => {
    const [date, setDate] = useState("");

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
                />
                <OptionalInput
                    label="Add a Location"
                    placeholder="Location"
                    style={styles.input}
                />
                <OptionalInput
                    label="Set an Expiration"
                    style={styles.input}
                    Input={() => (
                        <DatePicker
                            placeholder="Expiration date"
                            date={date}
                            setDate={setDate}
                        />
                    )}
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