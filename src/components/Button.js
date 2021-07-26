import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as DefaultButton } from 'react-native-elements';

const Button = (props) => {
    const { color, type } = props;

    const styles = StyleSheet.create({
        button: {
            borderRadius: 15,
            padding: 15,
            borderWidth: 2,
            backgroundColor: (
                (type === 'secondary')
                    ? 'transparent'
                    : color

            ),
            borderColor: (
                (type !== 'secondary')
                    ? 'transparent'
                    : color
            )
        },
        title: {
            fontFamily: 'Nunito',
            fontSize: 24,
            color: (
                (type === 'secondary')
                    ? 'white'
                    : '#41CA99'
            )
        },
    });

    return (
        <DefaultButton
            {...props}
            buttonStyle={[
                props.buttonStyle,
                styles.button
            ]}
            titleStyle={[
                props.titleStyle,
                styles.title
            ]}
        />
    );
};

export default Button;
