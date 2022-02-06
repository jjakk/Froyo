import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { BASE_URL } from '../../constants/constants';

const ImageList = (props) => {
    const {
        style,
        keys
    } = props;

    return (
        <View style={style}>
            <FlatList
                data={keys}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{
                            uri: `${BASE_URL}/images/${item}`
                        }}
                    />
                )}
            />
        </View>
    );
};

export default ImageList;