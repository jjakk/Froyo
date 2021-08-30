import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableNativeFeedback,
    Platform,
    StatusBar,
    View,
    Image,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {
    Button,
    Input,
    Text
} from '../../components/froyo-elements';
import BackIcon from '../../../assets/icons/Back.svg';
import UploadIcon from '../../../assets/icons/Upload.svg';

const AccountEditScreen = ({ navigation }) => {
    return(
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
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
                            />
                        </View>
                        <View style={styles.gap}></View>
                        <View style={styles.nameInputContainer}>
                            <Input
                                placeholder='Last'
                            />
                        </View>
                    </View>
                    <Input
                        style={styles.field}
                        placeholder='Username'
                    />
                    <Input
                        style={[styles.field, styles.description]}
                        multiline
                        numberOfLines={4}
                        placeholder='Description'
                    />
                </View>
                <Button
                    title='Save'
                    color='#41CA99'
                    textColor='white'
                    buttonStyle={styles.submit}
                />
                <TouchableNativeFeedback onPress={() => navigation.navigate('AccountView')}>
                    <BackIcon width={25} height={25} style={styles.back} />
                </TouchableNativeFeedback>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
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
    }
});

export default AccountEditScreen;

