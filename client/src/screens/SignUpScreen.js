import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

import { Context as AuthContext } from '../context/AuthContext';

import Spacer from '../components/Spacer';

const SignUpScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setComfirmPassword] = useState(''); 

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Create An Account</Text>
            </Spacer>
            
            {/* To be changed to Phone # */}
            <Input label='Email' value={email} onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} />
            <Spacer />
            
            <Input label='Password' value={password} onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} secureTextEntry />
            <Spacer />
            
            <Input label='Confirm Password' value={confirmPassword} onChangeText={setComfirmPassword} autoCapitalize='none' autoCorrect={false} secureTextEntry />
            
            <Spacer>
                <Button title='Sign Up' onPress={() => signup({ email, password, confirmPassword })}></Button>
            </Spacer> 

            { state.errorMessage ? <Spacer><Text style={{ color: 'red', fontSize: 16 }}>{state.errorMessage}</Text></Spacer> : null }

            <Spacer>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ color: 'blue' }}>Log in with your account</Text>
                </TouchableOpacity>
            </Spacer>
            
            <Button 
                title='Go to Main Flow'
                onPress={() => navigation.navigate('mainFlow')}
            />
        </View>
    );
};

// Remove the header
SignUpScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 70,
    }
});

export default SignUpScreen;