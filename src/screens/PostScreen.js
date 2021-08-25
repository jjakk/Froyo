import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostScreen = ({ navigation }) => {
    return(
        <SafeAreaView>
            <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
                <Ionicons name="arrow-back" size={52} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    back: {
        margin: 15
    }
});

export default PostScreen;

