import React from 'react';
// Components
import { Appearance, StyleSheet, View, FlatList } from 'react-native';
import { LoadingAnimation } from '../froyo-elements';
import EmptyMessage from '../messages/EmptyMessage';
import Meetup from './Meetup';
// Context
import { useMeetup } from '../../context/MeetupContext';
// Constants
import { colors } from '../../constants/constants';

const MeetupList = (props) => {
    // Context
    const theme = Appearance.getColorScheme();

    // Props
    const {
        loading,
        emptyMessage
    } = props;

    const meetups = [];

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container
        ]}>
            <FlatList
                data={meetups}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Meetup
                        data={item}
                    />
                )}
                ListEmptyComponent={() => (
                    loading ? (
                        <LoadingAnimation
                            size={50}
                            style={styles.meetupsLoading}
                        />
                    ) : (
                        <EmptyMessage
                            style={styles.emptyMessage}
                            subheaderText={emptyMessage}
                        />
                    )
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyMessage: {
        alignSelf: 'center',
        marginTop: 35,
        width: 300
    },
    meetupsLoading: {
        alignSelf: 'center',
        marginTop: 50
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default MeetupList;