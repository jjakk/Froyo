import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/froyo-elements';
import { Context as AuthContext } from '../../context/AuthContext';

const AccountViewScreen = () => {
    const { signOut } = useContext(AuthContext);

    return(
        <View>
            <Button
                title='Sign out'
                color='#41CA99'
                textColor='white'
                onPress={() => {
                    signOut();
                }}
            />
        </View>
    );
};

export default AccountViewScreen;

