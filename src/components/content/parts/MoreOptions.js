import React from 'react';
import { Appearance } from 'react-native';
import OptionsMenu from "react-native-option-menu";
// Navigation
import { navigate } from '../../../navigation/navigationRef';
// Helper functions
import confirmAlert from '../../../helperFunctions/confirmAlert';
// Contexts
import { useUser } from '../../../context/UserContext';
import { useContent } from '../../../context/ContentContext';
// Icons
import MoreOptionsIcon from '../../../../assets/icons/MoreSettings.svg';
import TrashIcon from '../../../../assets/icons/Trash.svg';
import PenIcon from '../../../../assets/icons/Pen.svg';

// Constants
import {
    colors,
    sizes
} from '../../../constants/constants';

const MoreOptions = (props) => {
    const theme = Appearance.getColorScheme();
    const { state: { user } } = useUser();
    const { deleteContent } = useContent();
    const {
        content,
        onDelete
    } = props;
    const contentType = !content.parent_id ? 'Post' : 'Comment';

    // Default functions for edit button
    const onEdit = () => {
        navigate(`${contentType}Edit`, {
            data: content
        });
    };
    
    // Show delete confirmation, and delete if confirmed
    const onDeletePrompt = async () => {
        confirmAlert(
            {
                title: `Are you sure you want to delete this ${contentType.toLowerCase()}?`
            }, async () => {
                await deleteContent(contentType, content.id);
                onDelete();
            }
        );
    };

    // More options menu items
    const options = [
        // Only show these options if it's your own content
        ...(content.author.id === user.id ? [
            {
                label: 'Edit',
                onSelect: onEdit,
                Icon: PenIcon,
                color: 'black'
            },
            {
                label: 'Delete',
                onSelect: onDeletePrompt,
                Icon: TrashIcon,
                color: '#FB1C1C'
            }
        ]: []),
        // The rest of the options go below
        {
            label: 'Cancel',
            colors: colors.light.FOURTH
        }
    ];

    const optionLabels = options.map(option => option.label);
    const optionHandlers = options.map(option => option.onSelect);

    const MoreIcon = (
        <MoreOptionsIcon
            width={sizes.ACTION_ICON_SMALLER}
            height={sizes.ACTION_ICON_SMALLER}
            color={colors[theme === 'dark' ? 'GRAY' : 'LIGHT_BLACK']}
        />
    );

    return (
        options.length > 1 ? (
            <OptionsMenu
                customButton={MoreIcon}
                destructiveIndex={optionLabels.indexOf('Delete')}
                options={optionLabels}
                actions={optionHandlers}
            />
        ) : MoreIcon
    );
};

export default MoreOptions;
