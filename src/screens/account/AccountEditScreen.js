import React, { useState } from 'react';
// Components
import {
    StyleSheet,
    View,
    ImageBackground
} from 'react-native';
import {
    Button,
    Input,
    ImageSelect,
} from '../../components/froyo-elements';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
// Icons
import UploadIcon from '../../../assets/icons/Upload.svg';
// Context
import { useUser } from '../../context/UserContext';
// Constants
import { BASE_URL, colors } from '../../constants/constants';

const AccountEditScreen = ({ navigation }) => {
    const { updateUser, state: { user } } = useUser();
    // Form feilds
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [username, setUsername] = useState(user.username);
    const [description, setDescription] = useState(user.description);
    const [image, setImage] = useState(null);
    // Status states
    const [loading, setLoading] = useState(false);

    // Conditional rendering
    const profilePictureSource = (
        image
            ? {
                uri: image
            } : (
                user.profile_picture_bucket_key
                ? {
                    uri: `${BASE_URL}/images/${user.profile_picture_bucket_key}`
                }
                : require('../../../assets/icons/guest.png')
            )
    );

    const handleSubmit = () => {
        setLoading(true);
        // Code to catch submitting no changes
        /*if (
            firstName === user.first_name &&
            lastName === user.last_name &&
            username === user.username &&
            description === user.description
        ){
            setLoading(false);
            throw Error({ message: 'No changes' });
            return;
        }*/
        updateUser({
            firstName,
            lastName,
            username,
            description
        });
        setLoading(false);
        navigation.pop();
    };

    return(
        <ScreenContainer>
            <Header navigation={navigation} />
            <View style={styles.form}>
                <ImageBackground
                    source={profilePictureSource}
                    style={styles.profilePicture}
                    imageStyle={styles.profilePictureImage}
                >
                    <View style={styles.filter}/>
                    <UploadIcon
                        width={35}
                        height={35}
                        color={colors.LIGHT_BLACK}
                    />
                </ImageBackground>
                <View style={styles.fields}>
                    <View style={[styles.field, styles.nameInputs]}>
                        <View style={styles.nameInputContainer}>
                            <Input
                                placeholder='First'
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        <View style={styles.gap}></View>
                        <View style={styles.nameInputContainer}>
                            <Input
                                placeholder='Last'
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>
                    <Input
                        style={styles.field}
                        placeholder='Username'
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Input
                        style={[styles.field, styles.description]}
                        textStyle={styles.descriptionText}
                        multiline
                        numberOfLines={4}
                        placeholder='Description'
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
                <Button
                    title='Save'
                    loading={loading}
                    buttonStyle={styles.submit}
                    onPress={handleSubmit}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 0,
        justifyContent: 'center'
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
    profilePicture: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    profilePictureImage: {
        borderRadius: 100
    },
    filter: {
        width: 100,
        height: 100,
        backgroundColor: colors.GRAY,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        opacity: 0.5
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
        alignSelf: 'stretch',
        textAlignVertical: 'top'
    }
});

export default AccountEditScreen;

