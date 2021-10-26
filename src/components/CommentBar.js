import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { View } from 'react-native';
import { Input } from '../components/froyo-elements';

const CommentBar = (props) => {
    const {
        style
    } = props;

    return (
        <View style={[styles.bar, style]}>
            <Input style={styles.input} placeholder='Comment...'/>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        backgroundColor: 'white',
        height: 125,
        width: '100%',
        padding: 20
    },
    input: {
        backgroundColor: '#F2F2F2',
        borderWidth: 0
    }
});

export default CommentBar;
