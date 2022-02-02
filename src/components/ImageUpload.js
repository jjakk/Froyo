import React, { useState } from 'react';
// Componenets
import {
    FlatList,
    View,
    StyleSheet
} from 'react-native';
import {
    Text,
    ImageSelect
} from './froyo-elements';
// Context
import { useSettings } from '../context/SettingsContext';
// Constants
import { colors } from '../constants/constants';
// Icons
import PlusIcon from '../../assets/icons/Plus.svg';

const ImageUpload = (props) => {
    // Context
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark';

    // Props
    const {
        style
    } = props;

    // State
    const [images, setImages] = useState([null]);

    const onUpload = (image) => {
        setImages([image, ...images]);
    }

    const onDelete = (index) => {
        setImages([
            ...images.slice(0, index),
            ...images.slice(index + 1)
        ]);
    };

    return (
        <FlatList
            style={[
                styles.list,
                style
            ]}
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ index }) => (
                <>
                <ImageSelect
                    style={[
                        styles.imageUpload
                    ]}
                    uploadedStyle={styles.imageUploaded}
                    PlaceholderComponent={(
                        <View style={styles.imageUploadPlaceholder}>
                            <PlusIcon
                                color={darkModeEnabled ? colors.light.SECOND : colors.dark.SECOND}
                            />
                            <Text>
                                Add an image
                            </Text>
                        </View>
                    )}
                    image={images[index]}
                    setImage={onUpload}
                    onDelete={() => onDelete(index)}
                />
                </>
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    // Image upload
    imageUpload: {
        marginBottom: 25,
        height: 100,
        borderWidth: 1,
        borderRadius: 15,
    },
    imageUploaded: {
        height: 300,
        borderWidth: 0,
        borderRadius: 5
    },
    imageUploadPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ImageUpload;
