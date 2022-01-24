import React from 'react';
// Components
import { StyleSheet, View } from 'react-native';
import { Text } from '../froyo-elements';
import Comment from './Comment';
// Context
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';

const CommentList = (props) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';
    const {
        comments,
        loading,
        onDeleteComment
    } = props;

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container
        ]}>
            {
                !loading ? (
                    comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                onDelete={onDeleteComment}
                            />
                        ))
                    ) : (
                        <Text style={[
                            styles.noComments,
                            themeStyles[theme].text
                        ]}>No comments</Text>
                    )
                ) : (
                    <Text style={[
                        styles.noComments,
                        themeStyles[theme].text
                    ]}>Loading</Text>
                )
                
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noComments: {
        fontSize: 28,
        alignSelf: 'center',
        opacity: 0.75,
        marginTop: 50
    },
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.LIGHT_GREY
        },
        text: {
            color: colors.LIGHT_BLACK
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.THIRD
        },
        text: {
            color: colors.GREY
        }
    })
};

export default CommentList;
