import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as DefaultButton } from 'react-native-elements';

const Button = (props) => {
    const { color, textColor, type, textAlign } = props;

    const styles = StyleSheet.create({
        button: {
            borderRadius: 15,
            padding: 10,
            borderWidth: 1,
            backgroundColor: (
                (type === 'secondary')
                    ? 'transparent'
                    : color

            ),
            borderColor: (
                (type !== 'secondary')
                    ? 'transparent'
                    : color
            ),
            justifyContent: (textAlign === 'left' ? 'flex-start' : 'center')
        },
        title: {
            fontFamily: 'Nunito',
            fontSize: 24,
            color: (textColor || 'white'),
        }
    });

    return (
        <DefaultButton
            {...props}
            buttonStyle={[
                styles.button,
                props.buttonStyle
            ]}
            titleStyle={[
                styles.title,
                props.titleStyle
            ]}
            loadingProps={{
                color: textColor,
                size: 31
            }}
        />
    );
};

export default Button;
