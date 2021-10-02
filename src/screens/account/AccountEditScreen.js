import React, { useContext, useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import {
    Button,
    Input
} from '../../components/froyo-elements';
import ErrorMessage from '../../components/ErrorMessage';
import { Context as AuthContext } from '../../context/AuthContext';
import BackIcon from '../../../assets/icons/Back.svg';
import UploadIcon from '../../../assets/icons/Upload.svg';

const LOADING_TEXT = 'Loading';

const AccountEditScreen = ({ navigation }) => {
    const { getUserInfo, updateUserInfo, state: { user, errorMessage } } = useContext(AuthContext);
    const [firstName, setFirstName] = useState(LOADING_TEXT);
    const [lastName, setLastName] = useState(LOADING_TEXT);
    const [username, setUsername] = useState(LOADING_TEXT);
    const [description, setDescription] = useState(LOADING_TEXT);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async function(){
            await getUserInfo();
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setDescription(user.description);
            setContentLoaded(true);
        })();
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        updateUserInfo({ firstName, lastName, username, description }, (success) => {
            setLoading(false);
            if(success) {
                navigation.navigate('AccountView');
            }
        });
    };

    return(
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor='#F2F2F2' barStyle='dark-content' />
                    <View style={styles.profilePictureUpload}>
                        <Image
                            source={require('../../../assets/icons/guest.png')}
                            style={styles.profilePicture}
                        />
                        <View style={styles.filter}></View>
                        <UploadIcon width={35} height={35} style={styles.uploadIcon} />
                    </View>
                    <View style={styles.fields}>
                        <View style={[styles.field, styles.nameInputs]}>
                            <View style={styles.nameInputContainer}>
                                <Input
                                    placeholder='First'
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    editable={contentLoaded}
                                />
                            </View>
                            <View style={styles.gap}></View>
                            <View style={styles.nameInputContainer}>
                                <Input
                                    placeholder='Last'
                                    value={lastName}
                                    onChangeText={setLastName}
                                    editable={contentLoaded}
                                />
                            </View>
                        </View>
                        <Input
                            style={styles.field}
                            placeholder='Username'
                            value={username}
                            onChangeText={setUsername}
                            editable={contentLoaded}
                        />
                        <Input
                            style={[styles.field, styles.description]}
                            textStyle={styles.descriptionText}
                            multiline
                            numberOfLines={4}
                            placeholder='Description'
                            value={description}
                            onChangeText={setDescription}
                            editable={contentLoaded}
                        />
                    </View>
                    <Button
                        title='Save'
                        color='#41CA99'
                        textColor='white'
                        loading={loading}
                        buttonStyle={styles.submit}
                        onPress={handleSubmit}
                    />
                    <ErrorMessage message={errorMessage} style={styles.errorMessage} />
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('AccountView')}>
                        <BackIcon width={25} height={25} style={styles.back} />
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 20,
        left: 20,
    },
    label: {
        fontSize: 28,
        marginBottom: 15
    },
    field: {
        margin: 25,
        marginBottom: 0,
    },
    fields: {
        marginTop: 25
    },
    submit: {
        margin: 25,
    },
    errorMessage: {
        marginTop: 10
    },
    // Profile Picture Upload Button
    profilePictureUpload: {
        marginTop: 45,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
    profilePicture: {
        width: 100,
        height: 100,
        position: 'absolute'
    },
    filter: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 999999,
        opacity: 0.75
    },
    uploadIcon: {
        opacity: 0.9
    },
    // Input Fields
    // Name
    nameInputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameInputContainer: {
        flex: 1
    },
    gap: {
        width: 25,
    },
    // Description
    description: {
        height: 175,
        textAlignVertical: 'top'
    },
    descriptionText: {
        justifyContent: 'flex-start',
        textAlignVertical: 'top'
    }
});

export default AccountEditScreen;

