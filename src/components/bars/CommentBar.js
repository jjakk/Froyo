import React, { useState } from 'react';
import {
    Alert,
    Appearance,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { View } from 'react-native';
// Components
import { Input } from '../froyo-elements';
// Context
import { useContent } from '../../context/ContentContext';
// Icons
import SendIcon from '../../../assets/icons/Send.svg';
// Constants
import { colors } from '../../constants/constants';

// ParentId -> string: ID of the content that's being commented one
// onCreateComment -> function: callback function to be called when the comment is created
const CommentBar = (props) => {
    // Context
    const theme = Appearance.getColorScheme();
    const { createContent } = useContent();
    const darkModeEnabled = theme === 'dark' ;
    
    // Props
    const {
        style,
        parent_id,
        onCreateComment
    } = props;
    
    // State
    const [commentText, setCommentText] = useState('');

    const onSubmit = async () => {
        try {
            const content = {
                text: commentText,
                parent_id
            };
            await createContent('comment', content);
            setCommentText('');
            onCreateComment();
        }
        catch (err) {
            Alert.alert(err.message);
        }
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
                multiline
                placeholder='Comment...'
                placeholderTextColor={darkModeEnabled ? colors.light.FIRST : colors.light.SECOND}
                value={commentText}
                onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={onSubmit}>
                <SendIcon style={styles.send} width={35} height={35} color={darkModeEnabled ? colors.light.THIRD : colors.GREEN}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2
    },
    input: {
        borderWidth: 0,
        maxHeight: 250,
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
            color: colors.light.FOURTH
        }
    }),
    dark: StyleSheet.create({
        bar: {
            borderTopWidth: 0,
            backgroundColor: colors.dark.THIRD
        },
        input: {
            backgroundColor: colors.dark.FIRST
        },
        inputText: {
            color: colors.light.FIRST
        }
    })
};

export default CommentBar;
