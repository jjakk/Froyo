import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
// Components
import { Input } from '../froyo-elements';
// Context
import { useSettings } from '../../context/SettingsContext';
import { useContent } from '../../context/ContentContext';
// Icons
import SendIcon from '../../../assets/icons/Send.svg';
// Constants
import { colors } from '../../constants/constants';

// ParentId -> string: ID of the content that's being commented one
// onCreateComment -> function: callback function to be called when the comment is created
const CommentBar = (props) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';
    const { createContent } = useContent();
    const [commentText, setCommentText] = useState('');
    const {
        style,
        parent_id,
        onCreateComment
    } = props;

    const onSubmit = async () => {
        const content = {
            text: commentText,
            parent_id
        };
        await createContent('comment', content);
        setCommentText('');
        onCreateComment();
    };

    return (
        <View style={[
            styles.bar,
            themeStyles[theme].bar,
            style
        ]}>
            <Input
                style={[
                    styles.input,
                    themeStyles[theme].input
                ]}
                textStyle={
                    themeStyles[theme].inputText
                }
                placeholder='Comment...'
                placeholderTextColor={darkModeEnabled ? colors.LIGHT_GREY : colors.GREY}
                value={commentText}
                onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={onSubmit}>
                <SendIcon style={styles.send} width={35} height={35} color={colors.GREEN}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        height: 100,
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2
    },
    input: {
        borderWidth: 0,
        flex: 1
    },
    send: {
        marginLeft: 25
    }
});

const themeStyles = {
    light: StyleSheet.create({
        bar: {
            borderTopColor: colors.light.FIRST,
            backgroundColor: colors.WHITE
        },
        input: {
            backgroundColor: colors.light.FIRST
        },
        inputText: {
            color: colors.LIGHT_BLACK
        }
    }),
    dark: StyleSheet.create({
        bar: {
            borderTopColor: colors.dark.FIRST,
            backgroundColor: colors.dark.SECOND
        },
        input: {
            backgroundColor: colors.dark.FIRST
        },
        inputText: {
            color: colors.LIGHT_GREY
        }
    })
};

export default CommentBar;
