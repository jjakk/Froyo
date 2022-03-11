import React, { useState } from 'react';
// Components
import {
    StyleSheet,
    Alert,
    Keyboard,
    View,
} from 'react-native';
import {
    Input,
    Button
} from '../../froyo-elements';
// Context
import { useContent } from '../../../context/ContentContext';

const CommentForm = (props) => {
    // Context
    const {
        createContent,
        updateContent
    } = useContent();

    // Props
    const {
        navigation,
        data: {
            id,
            parent_id,
            text: passedText
        }
    } = props;

    // State
    const [text, setText] = useState(passedText);
    const [loading, setLoading] = useState(false);
    const formUnchanged = passedText === text;

    const onSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            // Update comment if an ID is given
            if (id) {
                await updateContent('comment', id, { text });
            }
            // Create a new comment if a parentId is given
            else if (parent_id){
                await createContent('comment', { parent_id, text });
            }
            navigation.pop();
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                multiline
                placeholder='Type here...'
                value={text}
                onChangeText={setText}
            />
            <Button
                title='Save'
                onPress={onSubmit}
                disabled={formUnchanged}
                loading={loading}
                style={styles.submit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
    submit: {
        marginTop: 25
    }
});

export default CommentForm;
