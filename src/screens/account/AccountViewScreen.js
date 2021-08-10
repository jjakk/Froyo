import React, { useContext } from 'react';
import { SafeAreaView, View, Image, StyleSheet, StatusBar } from 'react-native';
import { Button, Text, Spacer } from '../../components/froyo-elements';
import { Context as AuthContext } from '../../context/AuthContext';

const AccountViewScreen = () => {
    const { signOut } = useContext(AuthContext);

    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#F2F2F2' barStyle='dark-content' />
            <View style={styles.profile}>
                <View style={styles.header}>
                    <Image style={styles.profilePicture} source={require('../../../assets/icons/guest.png')} />
                    <View style={styles.headerText}>
                        <Text style={styles.name}>John Khachain</Text>
                        <Text style={styles.username}>@Jak</Text>
                        <View style={styles.numbers}>
                            <Text style={styles.followers}>10 Followers</Text>
                            <Text style={styles.following}>3 Following</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.description}>
                    College Software engineering student studying at Drexel University. CEO & founder of Protos Apps LLC.
                </Text>
            </View>
            <Spacer>
                <Button
                    title='Sign out'
                    color='#41CA99'
                    textColor='white'
                    onPress={() => {
                        signOut();
                    }}
                />
            </Spacer>
        </SafeAreaView>
    );
};

AccountViewScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    // Profile
    profile: {
        margin: 25
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerText: {
        marginLeft: 15
    },
    profilePicture: {
        width: 100,
        height: 100
    },
    name: {
        fontSize: 30,
    },
    username: {
        fontSize: 24,
        marginBottom: 5
    },
    numbers: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    followers: {
        fontSize: 16
    },
    following: {
        fontSize: 16,
        marginLeft: 10
    },
    description: {
        fontSize: 22
    }
});

export default AccountViewScreen;

