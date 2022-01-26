import React, { useEffect, useState } from 'react';
// Components
import {
    View,
    StyleSheet
} from 'react-native';
import {
    Input,
    TouchableIcon
} from '../froyo-elements';
// Context
import { useSettings } from '../../context/SettingsContext';
// Icons
import SearchIcon from '../../../assets/icons/Search.svg';
import CloseIcon from '../../../assets/icons/Close.svg'
// Constants
import { colors } from '../../constants/constants';

const SearchBar = (props) => {
    const { state: { theme } } = useSettings();
    const [text, setText] = useState('');
    const {
        onSearch,
        onClear,
        setSearchText
    } = props;

    const clearText = async () => {
        setText('');
        setSearchText('');
        onClear();
    };

    useEffect(() => {
        setSearchText(text);
    }, [text]);

    return (
        <View>
            <View style={[
                styles.container,
                themeStyles[theme].container
            ]}>
                <Input
                    style={styles.text}
                    onChangeText={setText}
                    value={text}
                    placeholder='Search'
                    icon={(
                        <SearchIcon
                            color={colors[theme === 'dark' ? 'GREY' : 'LIGHT_BLACK']}
                            width={25}
                            height={25}
                        />
                    )}
                    onSubmitEditing={onSearch}
                />
                {
                    text !== '' ? (
                        <TouchableIcon
                            Icon={CloseIcon}
                            size={20}
                            color={colors[theme === 'dark' ? 'GREY' : 'LIGHT_BLACK']}
                            style={styles.clear}
                            onPress={clearText}
                        />
                    ) : null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 50,
        margin: 25
    },
    text: {
        flex: 1,
        borderRadius: 0, 
        borderWidth: 0
    },
    clear: {
        marginRight: 20,
        opacity: 0.5
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.WHITE
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FIRST
        }
    })
};

export default SearchBar;

