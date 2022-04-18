import React, { useState, useEffect } from "react";
// Components
import {
    Appearance,
    StyleSheet,
    Keyboard,
    View,
    Alert
} from "react-native";
import { NavigationEvents } from "react-navigation";
import {
    Input,
    TouchableIcon
} from "../../froyo-elements";
import ImageUpload from "../../ImageUpload";
// Constants
import { BASE_URL, colors } from "../../../constants/constants";
// Icons
import SendIcon from "../../../../assets/icons/Send.svg";
// Context
import { useContent } from "../../../context/ContentContext";
import { useSettings } from "../../../context/SettingsContext";

const PostForm = (props) => {
    // Context
    const {
        createContent,
        updateContent
    } = useContent();
    const { state: { primaryColors } } = useSettings();

    // Props
    const {
        navigation,
        data,
        type
    } = props;
    const {
        text: passedText,
        images: unformatedPassedImages
    } = data;

    const passedImages = unformatedPassedImages
        ? unformatedPassedImages.map(img => `${BASE_URL}/images/${img}`)
        : null

    // State
    const [text, setText] = useState(passedText || "");
    const [images, setImages] = useState(passedImages || []);
    const [loading, setLoading] = useState(false);

    // Event Handlers
    const handleSubmit = async () => {
        try{
            Keyboard.dismiss()
            setLoading(true);
            switch(type){
                case "create":
                    await createContent("post", { text, images });
                    break;
                case "edit":
                    await updateContent("post", data.id, { text, images });
                    break;
            }  
            // Clear form data
            setText("");
            setImages([]);
            navigation.pop();
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    // Image events
    const onImageSelect = (image) => {
        setImages([...images, image]);
    }

    const onImageDelete = (index) => {
        setImages([
            ...images.slice(0, index),
            ...images.slice(index + 1)
        ]);
    };


    return (
        <View style={styles.container}>
            <NavigationEvents/>
            <View style={styles.body}>
                <Input
                    style={styles.textbox}
                    multiline
                    placeholder="Type here..."
                    value={text}
                    onChangeText={setText}
                />
                <TouchableIcon
                    Icon={SendIcon}
                    color={primaryColors.MAIN}
                    onPress={handleSubmit}
                    size={30}
                    loading={loading}
                    style={styles.submit}
                />
            </View>
            <ImageUpload
                style={styles.imageUpload}
                images={images}
                onImageSelect={onImageSelect}
                onDelete={onImageDelete}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    // Text input
    textbox: {
        fontSize: 22,
        flex: 1,
        maxHeight: 250,
    },
    // Image upload
    imageUpload: {
        flex: 1,
        paddingRight: 25,
        paddingLeft: 25
    },
    submit: {
        marginLeft: 20,
    },
    error: {
        bottom: 25
    }
});

PostForm.defaultProps = {
    data: {
        text: null,
        images: null
    }
};

export default PostForm;