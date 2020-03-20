import React from 'react';
import { View, Text } from 'native-base';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

function Logout(props) {
    React.useEffect(() => {
        AsyncStorage.removeItem('username');
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ]
        }));
    })
    return (
        <View>
            <Text>Logout</Text>
        </View>
    );
}

export default Logout;