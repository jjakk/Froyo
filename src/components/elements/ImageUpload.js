import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
// Components
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import Text from './Text';
  
const ImageUpload = (props) => {
    // Props
    const {
        onUpload,
        style
    } = props;

    // State
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            onUpload(result.uri);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <View style={[styles.upload, style]}>
                {
                    image ? (
                        <Image
                            source={{ uri: image }}
                            style={{ flex: 1 }}
                        />
                    ) : (
                        <Text style={styles.text}>
                            Upload an image
                        </Text>
                    )
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    upload: {
        borderColor: 'grey',
        justifyContent: 'center',
        borderWidth: 1,
        height: 250,
    },
    text: {
        alignSelf: 'center'
    }
});

export default ImageUpload;

