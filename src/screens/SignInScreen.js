import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignInScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 40 }}>SIGN IN</Text>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ color: 'blue' }}>Create an account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({});

export default SignInScreen;