import React, { useEffect, useState, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Appearance, View, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Overlay } from 'react-native-elements';
import { colors } from '../../constants/constants';
import Button from './Button';

const DatePicker = (props) => {
    const [date, setDate] = useState(new Date(new Date().toJSON().slice(0,10).replace(/-/g,'/')));
    const [show, setShow] = useState(false);
    const { dob, setDob } = props;
    const systemDarkModeEnabled = Appearance.getColorScheme() === 'dark';
    // check if date has been touched yet
    const didMountRef = useRef(false);

    useEffect(() => {
        if(didMountRef.current){
            setDob(date);
        }
        else{
            didMountRef.current = true;
        }
    }, [date]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const parseDate = (date) => {
        const day = date.getDate();
        const month = 1 + date.getMonth();
        const year = 1900 + date.getYear();
        return `${month}/${day}/${year}`;
    }

    const toggleShow = () => {
        setShow(!show);
    };

    const dateProps = {
        testID: 'dateTimePicker',
        value: date,
        mode: 'date',
        is24Hour: true,
        display: 'spinner',
        onChange: onChange
    };

    return (
        <View>
            <Button
                onPress={() => {
                    toggleShow();
                }}
                title={dob ? parseDate(date) : 'Date of birth'}
                color={colors.light.SECOND}
                textColor={dob ? 'black' : 'rgba(0,0,0,0.3)'}
                type='secondary'
                textAlign='left'
                titleStyle={styles.buttonText}
                TouchableComponent={TouchableWithoutFeedback}
                {...props}
            />
            {
                Platform.OS === 'ios' ? (
                    <Overlay
                        overlayStyle={[
                            styles.overlay,
                            systemDarkModeEnabled ? {
                                backgroundColor: colors.dark.FOURTH
                            } : {
                                backgroundColor: colors.light.FIRST
                            }
                        ]}
                        isVisible={show}
                        onBackdropPress={toggleShow}
                    >
                        <DateTimePicker
                            {...dateProps}
                        />
                    </Overlay>
                ) : show ?
                    (
                        <DateTimePicker
                            {...dateProps}
                        />
                    ) : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        margin: 5
    },
    overlay: {
        width: 350,
        height: 225,
        borderRadius: 15
    }
});

export default DatePicker;