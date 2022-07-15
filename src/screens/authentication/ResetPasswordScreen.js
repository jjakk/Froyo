import React, { useState } from "react";
// Components
import {
    Alert,
    StyleSheet,
    View,
} from "react-native";
import {
    TextInput,
    Button,
    Text
} from "@froyo/elements";
import { ScreenContainer, Header } from "@froyo/fundamentals";
// Context
import { useUser } from "@froyo/user-context";

const ResetPasswordScreen = ({ navigation }) => {
    // Context
    const { resetPassword } = useUser();

    // State
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
            await resetPassword(email);
            setSuccess(true);
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer>
            <Header/>
            <View style={styles.form}>
                {
                    success ? (
                        <Text style={styles.confirmation}>
                            ✉️
                            {"\n"}
                            Password reset email sent!
                        </Text>
                    ) : (
                        <>
                            <Text style={styles.header}>Reset Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Button
                                buttonStyle={styles.submit}
                                title="Reset"
                                type="primary"
                                loading={loading}
                                onPress={onSubmit}
                            />
                        </>
                    )
                }
            </View>
        </ScreenContainer>
    );
};

ResetPasswordScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        alignItems: "center",
        marginTop: 100
    },
    header: {
        fontSize: 36,
        marginBottom: 10,
        textAlign: "center"
    },
    input: {
        width: 300,
        margin: 10
    },
    submit: {
        width: 300,
        margin: 10
    },
    confirmation: {
        textAlign: "center",
        width: 300,
        fontSize: 36,
    },
    back: {
        margin: 25
    }
});

export default ResetPasswordScreen;