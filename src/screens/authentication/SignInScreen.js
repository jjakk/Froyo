import React, { useState } from "react";
// Components
import {
    View,
    StyleSheet,
    Keyboard,
    Alert
} from "react-native";
import {
    Button,
    Text,
    TextInput,
    Hyperlink
} from "@froyo/elements";
import { ScreenContainer } from "@froyo/fundamentals";
// Context
import { useUser } from "@froyo/user-context";
import { useNotification } from "@froyo/notification-context";

const SignInScreen = ({ navigation }) => {
    const { signIn } = useUser();
    const { state: { notificationToken } } = useNotification();
    // Sign in feilds
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Status states
    const [loading, setLoading] = useState(false);

    // Event handlers
    const handleSubmit = async () => {
        let formSuccess = false;
        try {
            Keyboard.dismiss()
            setLoading(true);
            await signIn({ email, password, notificationToken });
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

    const handleRefSignUp = () => {
        navigation.navigate("SignUp")
    };

    return (
        <ScreenContainer>
            <View style={styles.form}>
                <Text style={styles.header}>Sign in</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <View>
                    <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry />
                    <Hyperlink
                        style={styles.forgotPassword}
                        onPress={() => navigation.navigate("ResetPassword")}
                    >
                            Forgot password?
                    </Hyperlink>
                </View>
                <Button
                    title="Sign in"
                    type="primary"
                    loading={loading}
                    buttonStyle={styles.submit}
                    onPress={handleSubmit}
                />
                <View style={styles.bottomText}>
                    <Text style={styles.linkLabel}>Don"t have an account?</Text>
                    <Hyperlink
                        style={{color: "#41CA99"}}
                        onPress={handleRefSignUp}
                    >
                        Sign up
                    </Hyperlink>
                </View>
            </View>
        </ScreenContainer>
    );
};

SignInScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    form: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    // Form elements
    input: {
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    forgotPassword: {
        marginBottom: 5,
        color: "#41CA99"
    },
    submit: {
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    // Bottom text
    bottomText: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    linkLabel: {
        fontSize: 18
    }
});

export default SignInScreen;

