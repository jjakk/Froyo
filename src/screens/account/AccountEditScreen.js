import React, { useState } from 'react';
// Components
import {
    StyleSheet,
    View,
    ImageBackground,
    Alert
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
    const [description, setDescription] = useState(user.description || '');
    const [image, setImage] = useState(null);
    // Status states
    const [loading, setLoading] = useState(false);

    const formUnchanged = (
        firstName === user.first_name &&
        lastName === user.last_name &&
        username === user.username &&
        description === user.description &&
        image === null
    );

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

    const handleSubmit = async () => {
        try{
            setLoading(true);
            await updateUser({
                firstName,
                lastName,
                username,
                description,
                image
            });
            navigation.pop();
        }
        catch(err){
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return(
        <ScreenContainer>
            <Header/>
            <View style={styles.form}>
                <ImageSelect
                    style={styles.imageSelect}
                    aspectRatio={[1, 1]}
                    imageQuality={0.1}
                    image={image}
                    setImage={setImage}
                >
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
                </ImageSelect>
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
                    disabled={formUnchanged}
                    containerStyle={styles.submit}
                    onPress={handleSubmit}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 25,
        justifyContent: 'center',
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
        marginBottom: 10
    },
    errorMessage: {
        marginTop: 10
    },
    // Profile Picture Upload Button
    imageSelect: {
        alignSelf: 'center',
        borderRadius: 100
    },
    profilePicture: {
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

