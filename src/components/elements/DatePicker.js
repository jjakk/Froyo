import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Overlay } from 'react-native-elements';
import Button from './Button';

const DatePicker = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [dateFocused, setDateFocused] = useState(false);

    const onChange = (event, selectedDate) => {
        if(!dateFocused){
            setDateFocused(true);
        }
        const currentDate = selectedDate || date;
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

    const DateSelection = (props) => {
        return (
            <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode={'date'}
                is24Hour={true}
                display='spinner'
                onChange={onChange}
                {...props}
            />
        );
    };

    return (
        <View>
            <Button
                onPress={() => {
                    toggleShow();
                    if(!dateFocused){
                        setDateFocused(true);
                    }
                }}
                title={(dateFocused ? (parseDate(date)) : 'Date of birth')}
                color='black'
                textColor={( dateFocused ? 'black' : 'rgba(0,0,0,0.3)')}
                type='secondary'
                textAlign='left'
                titleStyle={styles.buttonText}
                TouchableComponent={TouchableWithoutFeedback}
                {...props}
            />
            {
                Platform.OS === 'ios' ? (
                    <Overlay
                        overlayStyle={styles.overlay}
                        isVisible={show}
                        onBackdropPress={toggleShow}
                    >
                        <DateSelection/>
                    </Overlay>
                ) : show ?
                    (
                        <DateSelection/>
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