import React, { useEffect, useState, useRef } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Appearance, View, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Overlay } from "react-native-elements";
import { colors } from "@froyo/constants";
import Button from "./Button";
import Hyperlink from "./Hyperlink";

const DatePicker = (props) => {
    const [date, setDate] = useState(new Date(new Date().toJSON().slice(0,10).replace(/-/g,"/")));
    const [show, setShow] = useState(false);
    const {
        date: dob,
        setDate: setDob,
        placeholder="date",
        style
    } = props;
    const theme = Appearance.getColorScheme();
    const systemDarkModeEnabled = theme === "dark";
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
        setShow(Platform.OS === "ios");
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
        testID: "dateTimePicker",
        value: date,
        mode: "date",
        is24Hour: true,
        display: "spinner",
        onChange: onChange
    };

    return (
        <View style={style}>
            <Button
                onPress={() => {
                    toggleShow();
                }}
                title={
                    dob
                    ? `Birthday: ${parseDate(date)}`
                    : placeholder
                }
                color={colors[theme].FIRST}
                titleStyle={[
                    {
                        color: colors.light[
                            systemDarkModeEnabled
                                ? "FIRST"
                                : "FOURTH"
                        ]
                    },
                    styles.buttonText
                ]}
                TouchableComponent={TouchableWithoutFeedback}
                {...props}
            />
            {
                Platform.OS === "ios" ? (
                    <Overlay
                        overlayStyle={[
                            styles.overlay,
                            themeStyles[theme].overlay
                        ]}
                        isVisible={show}
                        onBackdropPress={toggleShow}
                    >
                        <DateTimePicker
                            {...dateProps}
                            style={{
                                width: 350,
                            }}
                        />
                        <Button
                            title="Set"
                            onPress={toggleShow}
                            style={styles.setButton}
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
        borderRadius: 15,
        padding: 10,
    },
    setButton: {
        fontSize: 20,
        textDecorationLine: "underline",
        alignSelf: "stretch",
    }
});

const themeStyles = {
    light: StyleSheet.create({
        overlay: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        overlay: {
            backgroundColor: colors.dark.THIRD
        }
    })
};

export default DatePicker;