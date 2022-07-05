import React, { useEffect, useState } from "react";
// Components
import {
    StyleSheet,
    Alert,
    Keyboard,
    View,
    ScrollView,
    Pressable
} from "react-native";
import {
    TextInput,
    Button,
    Text
} from "@froyo/elements";
// Context
import { useContent } from "@froyo/content-context";

const CommentForm = (props) => {
    // Context
    const {
        createContent,
        getContent,
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
    const [parent, setParent] = useState(null);
    const [loading, setLoading] = useState(false);
    const formUnchanged = passedText === text;

    const onSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            // Update comment if an ID is given
            if (id) {
                await updateContent("comment", id, { text });
            }
            // Create a new comment if a parentId is given
            else if (parent_id){
                await createContent("comment", { parent_id, text });
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

    useEffect(() => {
        (async function(){
            // Try getting parent comment if parent is a comment
            try {
                setParent(await getContent("comment", parent_id));
            }
            catch (err) {}
        })()
    }, []);

    return (
        <View style={styles.container}>
            {
                parent && (
                    <View style={styles.parentTextContainer}>
                        <ScrollView>
                            <Pressable>
                                <Text style={styles.parentText}>
                                    {parent.text}
                                </Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                )
            }
            <TextInput
                multiline
                placeholder="Type here..."
                value={text}
                onChangeText={setText}
                style={styles.textInput}
            />
            <Button
                title="Save"
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
        padding: 25
    },
    parentTextContainer: {
        maxHeight: 250,
        marginBottom: 25
    },
    parentText: {
        fontSize: 20
    },
    textInput: {
        maxHeight: 250
    },
    submit: {
        marginTop: 25
    }
});

export default CommentForm;
