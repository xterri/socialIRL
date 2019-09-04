import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

const SignUpScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 40 }}>SIGN UP</Text>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={{ color: 'blue' }}>Log in with your account</Text>
            </TouchableOpacity>

            <Button 
                title='Go to Main Flow'
                onPress={() => navigation.navigate('mainFlow')}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default SignUpScreen;