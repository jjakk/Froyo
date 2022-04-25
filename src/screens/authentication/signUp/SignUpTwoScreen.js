import React, { useState } from "react";
// Components
import {
    View,
    Keyboard,
    StyleSheet,
    Alert,
} from "react-native";
import {
    Text,
    TextInput,
    Button
} from "../../../components/froyo-elements";
import Header from "../../../components/Header";
import ScreenContainer from "../../../components/ScreenContainer";
// Context
import { useUser } from "../../../context/UserContext";

const SignUpTwoScreen = ({ navigation }) => {
    // Form params from previous screen
    const email = navigation.getParam("email");
    const username = navigation.getParam("username");
    const dob = navigation.getParam("dob");
    // This screen's form params
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    // Status states
    const [loading, setLoading] = useState(false);
    // Context values & functions
    const { signUp} = useUser();

    const handleSubmit = async () => {
        let formSuccess = false;
        try {
            setLoading(true);
            Keyboard.dismiss();
            await signUp({
                email,
                username,
                dob,
                first_name: firstName,
                last_name: lastName,
                password,
                passwordConfirm
            });
            formSuccess = true;
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
            if (formSuccess) {
                navigation.navigate("ResolveAuth");
            }
        }
    };

    return (
        <ScreenContainer>
            <Header/>
            <View style={styles.auth}>
                <Text style={styles.header}>Sign up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    autoCorrect={false}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    autoCorrect={false}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={setPasswordConfirm}
                    secureTextEntry
                />
                <Button
                    title="Sign up"
                    type="primary"
                    loading={loading}
                    buttonStyle={styles.submit}
                    containerStyle={styles.submitContainer}
                    onPress={handleSubmit}
                />
            </View>
        </ScreenContainer>
    );
};

SignUpTwoScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    auth: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        paddingBottom: 250
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    input: {
        width: 300,
        margin: 10
    },
    submit: {
        width: 300
    },
    submitContainer: {
        margin: 10
    },
    error: {
        color: "#FB1C1C",
        opacity: 0.5,
        marginTop: 25,
        fontSize: 22,
        width: 300,
        textAlign: "center"
    },
    back: {
        margin: 25
    }
});

export default SignUpTwoScreen;

