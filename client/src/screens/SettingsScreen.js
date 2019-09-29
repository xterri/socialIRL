import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { Context as AuthContext } from '../context/AuthContext';  
import Spacer from '../components/Spacer';

const SettingsScreen = () => {
    const { signout } = useContext(AuthContext)
    return (
        <View>
            <Text style={{ fontSize: 40 }}>ACCOUNT SETTINGS</Text>

            <Spacer>
                <Button title='Sign Out' onPress={signout} />
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({});

export default SettingsScreen;