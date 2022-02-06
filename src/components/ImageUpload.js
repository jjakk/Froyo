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
        style,
        images,
        onImageSelect,
        onDelete
    } = props;

    return (
        <View style={[style, styles.container]}>
            <FlatList
                data={images.length < 10 ? [...images, null] : images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ index }) => (
                    <>
                    <ImageSelect
                        style={[
                            styles.imageUpload
                        ]}
                        uploadedStyle={styles.imageUploaded}
                        PlaceholderComponent={(
                            <View style={styles.placeholder}>
                                <PlusIcon
                                    color={darkModeEnabled ? colors.light.SECOND : colors.dark.SECOND}
                                />
                                <Text style={styles.placeholderText}>
                                    Add an image
                                </Text>
                            </View>
                        )}
                        image={images[index]}
                        setImage={onImageSelect}
                        onDelete={() => onDelete(index)}
                    />
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    // Image upload
    imageUpload: {
        height: 100,
        borderWidth: 1,
        borderRadius: 15,
    },
    imageUploaded: {
        height: 300,
        marginBottom: 25,
        borderWidth: 0,
        borderRadius: 5
    },
    // Placeholder
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        marginTop: 5
    }
});

export default ImageUpload;
