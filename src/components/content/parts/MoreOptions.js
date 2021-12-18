import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
// Navigation
import { navigate, pop } from '../../../navigation/navigationRef';
// Components
import { Text } from '../../froyo-elements';
// Contexts
import { Context as AuthContext } from '../../../context/AuthContext';
import { Context as PostContext } from '../../../context/PostContext';
import { Context as CommentContext } from '../../../context/CommentContext';
// Icons
import MoreOptionsIcon from '../../../../assets/icons/MoreSettings.svg';
import TrashIcon from '../../../../assets/icons/Trash.svg';
import PenIcon from '../../../../assets/icons/Pen.svg';
import SaveIcon from '../../../../assets/icons/Save.svg';

// Constants
import {
    colors,
    sizes
} from '../../../constants/constants';

const MoreOptions = (props) => {
    const { state: { user } } = useContext(AuthContext);
    const { deletePost } = useContext(PostContext);
    const { deleteComment } = useContext(CommentContext);
    const {
        content,
        onDelete,
        onError,
        style
    } = props;
    const contentType = !content.parent_id ? 'Post' : 'Comment';

    // Default functions for edit button
    const defaultOnEdit = () => {
        navigate(`${contentType}Edit`);
    };
    
    // Default function for delete button
    const defaultOnDelete = async () => {
        if (contentType === 'Post') {
            await deletePost(content.id, (err) => {
                if (err) {
                    onError(err);
                }
                else {
                    onDelete();
                }
            });
        }
        else {
            await deleteComment(content.id, (err) => {
                if (err) {
                    onError(err);
                }
                else {
                    onDelete();
                }
            });
        }
    };

    // More options menu items
    const moreOptions = [
        // Only show these options if it's your own content
        ...(content.author_id === user.id ? [
            {
                label: 'Delete',
                onSelect: defaultOnDelete,
                style: styles.deleteButton,
                Icon: TrashIcon,
                color: '#FB1C1C'
            },
            {
                label: 'Edit',
                onSelect: defaultOnEdit,
                Icon: PenIcon,
                color: 'black'
            }
        ]: []),
        // The rest of the options
        {
            label: 'Save',
            onSelect: () => {},
            Icon: SaveIcon,
            color: 'black'
        }
    ];

    return (
        <Menu style={style}>
            <MenuTrigger>
                <MoreOptionsIcon
                    name='options-vertical'
                    height={sizes.ACTION_ICON}
                    width={sizes.ACTION_ICON}
                    color='black'
                />
            </MenuTrigger>
            <MenuOptions style={styles.moreOptions}>
                {
                    moreOptions.map(option => (
                        <MenuOption key={option.label} onSelect={option.onSelect}>
                            <View style={styles.optionView}>
                                {
                                    option.Icon ? (
                                        <option.Icon
                                            width={sizes.OPTIONS_ICON}
                                            height={sizes.OPTIONS_ICON}
                                            color={option.color || 'black'}
                                        />
                                    ) : null
                                }
                                <Text style={
                                    [
                                        {
                                            color: option.color || 'black'
                                        },
                                        option.style,
                                        styles.optionText
                                    ]
                                }>{option.label}</Text>
                            </View>
                        </MenuOption>
                    ))
                }
            </MenuOptions>
        </Menu>
    );
};

const styles = StyleSheet.create({
    // More options menu
    moreOptions: {
        margin: 10
    },
    optionView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 20,
        marginLeft: 10
    }
});

export default MoreOptions;
